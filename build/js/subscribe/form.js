var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/form-elements/FormHeaderOption.svelte generated by Svelte v3.22.2 */
    const file = "src/form-elements/FormHeaderOption.svelte";

    function create_fragment(ctx) {
    	let div;
    	let h3;
    	let t0;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let p1;
    	let t4;
    	let t5;
    	let button;
    	let t6_value = (/*selected*/ ctx[4] ? "Selected" : "Select") + "";
    	let t6;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p0 = element("p");
    			t2 = text(/*description*/ ctx[1]);
    			t3 = space();
    			p1 = element("p");
    			t4 = text(/*price*/ ctx[2]);
    			t5 = space();
    			button = element("button");
    			t6 = text(t6_value);
    			attr_dev(h3, "class", "option__title svelte-1g0h4w");
    			add_location(h3, file, 10, 1, 272);
    			attr_dev(p0, "class", "option__description svelte-1g0h4w");
    			add_location(p0, file, 11, 1, 312);
    			attr_dev(p1, "class", "option__price svelte-1g0h4w");
    			add_location(p1, file, 12, 1, 362);
    			attr_dev(button, "class", "option__button svelte-1g0h4w");
    			attr_dev(button, "data-form", /*form*/ ctx[3]);
    			toggle_class(button, "selected", /*selected*/ ctx[4]);
    			add_location(button, file, 13, 1, 400);
    			attr_dev(div, "class", "option svelte-1g0h4w");
    			add_location(div, file, 9, 0, 250);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(p0, t2);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(p1, t4);
    			append_dev(div, t5);
    			append_dev(div, button);
    			append_dev(button, t6);
    			if (remount) dispose();
    			dispose = listen_dev(button, "click", /*handleClick*/ ctx[5], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*description*/ 2) set_data_dev(t2, /*description*/ ctx[1]);
    			if (dirty & /*price*/ 4) set_data_dev(t4, /*price*/ ctx[2]);
    			if (dirty & /*selected*/ 16 && t6_value !== (t6_value = (/*selected*/ ctx[4] ? "Selected" : "Select") + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*form*/ 8) {
    				attr_dev(button, "data-form", /*form*/ ctx[3]);
    			}

    			if (dirty & /*selected*/ 16) {
    				toggle_class(button, "selected", /*selected*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { title } = $$props,
    		{ description } = $$props,
    		{ price } = $$props,
    		{ form } = $$props,
    		{ selected } = $$props;

    	const dispatch = createEventDispatcher();

    	function handleClick(event) {
    		dispatch("select", event.target.dataset.form);
    	}

    	const writable_props = ["title", "description", "price", "form", "selected"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FormHeaderOption> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FormHeaderOption", $$slots, []);

    	$$self.$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("price" in $$props) $$invalidate(2, price = $$props.price);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("selected" in $$props) $$invalidate(4, selected = $$props.selected);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		description,
    		price,
    		form,
    		selected,
    		createEventDispatcher,
    		dispatch,
    		handleClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("description" in $$props) $$invalidate(1, description = $$props.description);
    		if ("price" in $$props) $$invalidate(2, price = $$props.price);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("selected" in $$props) $$invalidate(4, selected = $$props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description, price, form, selected, handleClick];
    }

    class FormHeaderOption extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			title: 0,
    			description: 1,
    			price: 2,
    			form: 3,
    			selected: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormHeaderOption",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
    			console.warn("<FormHeaderOption> was created without expected prop 'title'");
    		}

    		if (/*description*/ ctx[1] === undefined && !("description" in props)) {
    			console.warn("<FormHeaderOption> was created without expected prop 'description'");
    		}

    		if (/*price*/ ctx[2] === undefined && !("price" in props)) {
    			console.warn("<FormHeaderOption> was created without expected prop 'price'");
    		}

    		if (/*form*/ ctx[3] === undefined && !("form" in props)) {
    			console.warn("<FormHeaderOption> was created without expected prop 'form'");
    		}

    		if (/*selected*/ ctx[4] === undefined && !("selected" in props)) {
    			console.warn("<FormHeaderOption> was created without expected prop 'selected'");
    		}
    	}

    	get title() {
    		throw new Error("<FormHeaderOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<FormHeaderOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<FormHeaderOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<FormHeaderOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get price() {
    		throw new Error("<FormHeaderOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set price(value) {
    		throw new Error("<FormHeaderOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		throw new Error("<FormHeaderOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<FormHeaderOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<FormHeaderOption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<FormHeaderOption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/form-elements/FormHeader.svelte generated by Svelte v3.22.2 */
    const file$1 = "src/form-elements/FormHeader.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (47:2) {#each options as option}
    function create_each_block(ctx) {
    	let current;
    	const formheaderoption_spread_levels = [/*option*/ ctx[3]];
    	let formheaderoption_props = {};

    	for (let i = 0; i < formheaderoption_spread_levels.length; i += 1) {
    		formheaderoption_props = assign(formheaderoption_props, formheaderoption_spread_levels[i]);
    	}

    	const formheaderoption = new FormHeaderOption({
    			props: formheaderoption_props,
    			$$inline: true
    		});

    	formheaderoption.$on("select", /*handleSelect*/ ctx[1]);

    	const block = {
    		c: function create() {
    			create_component(formheaderoption.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formheaderoption, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formheaderoption_changes = (dirty & /*options*/ 1)
    			? get_spread_update(formheaderoption_spread_levels, [get_spread_object(/*option*/ ctx[3])])
    			: {};

    			formheaderoption.$set(formheaderoption_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formheaderoption.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formheaderoption.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formheaderoption, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(47:2) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let div;
    	let current;
    	let each_value = /*options*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Choose Your Subscription";
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "options-heading svelte-12el218");
    			add_location(h2, file$1, 44, 1, 1022);
    			attr_dev(div, "class", "options-table svelte-12el218");
    			add_location(div, file$1, 45, 1, 1081);
    			attr_dev(section, "class", "formHeader svelte-12el218");
    			add_location(section, file$1, 43, 0, 992);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*options, handleSelect*/ 3) {
    				each_value = /*options*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let options = [
    		{
    			title: "Magazine Only",
    			description: "Ireland + N. Ireland / Rest of the World",
    			price: "€25 / €30",
    			form: "magonly",
    			selected: false
    		},
    		{
    			title: "Books Only",
    			description: "Ireland + N. Ireland / Rest of the World",
    			price: "€30 / €35",
    			form: "bookonly",
    			selected: false
    		},
    		{
    			title: "Magazine + Books",
    			description: "Ireland + N. Ireland / Rest of the World",
    			price: "€50 / €60",
    			form: "magbook",
    			selected: false
    		},
    		{
    			title: "Patron",
    			description: "Choose Your Own Price",
    			price: "€100+",
    			form: "patron",
    			selected: false
    		}
    	];

    	const dispatch = createEventDispatcher();

    	const handleSelect = e => {
    		dispatch("formSelect", e.detail);
    		options.forEach(o => o.selected = false);
    		let s = options.findIndex(i => i.form === e.detail);
    		$$invalidate(0, options[s].selected = true, options);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FormHeader> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FormHeader", $$slots, []);

    	$$self.$capture_state = () => ({
    		FormHeaderOption,
    		createEventDispatcher,
    		options,
    		dispatch,
    		handleSelect
    	});

    	$$self.$inject_state = $$props => {
    		if ("options" in $$props) $$invalidate(0, options = $$props.options);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [options, handleSelect];
    }

    class FormHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormHeader",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/form-elements/FormInput.svelte generated by Svelte v3.22.2 */

    const file$2 = "src/form-elements/FormInput.svelte";

    // (16:0) {#if type === 'text'}
    function create_if_block_3(ctx) {
    	let label_1;
    	let span;
    	let t0;
    	let t1;
    	let input;
    	let t2;
    	let label_1_class_value;
    	let if_block = /*required*/ ctx[4] && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			span = element("span");
    			t0 = text(/*label*/ ctx[1]);
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(span, "class", "label-title svelte-nmjtwm");
    			add_location(span, file$2, 17, 2, 481);
    			attr_dev(input, "id", /*name*/ ctx[0]);
    			attr_dev(input, "type", /*type*/ ctx[3]);
    			input.required = /*required*/ ctx[4];
    			input.disabled = /*disabled*/ ctx[8];
    			attr_dev(input, "placeholder", " ");
    			attr_dev(input, "pattern", ".*\\S.*");
    			add_location(input, file$2, 18, 2, 524);
    			attr_dev(label_1, "for", /*name*/ ctx[0]);
    			attr_dev(label_1, "class", label_1_class_value = "" + (null_to_empty(/*classes*/ ctx[5]) + " svelte-nmjtwm"));
    			add_location(label_1, file$2, 16, 1, 440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, span);
    			append_dev(span, t0);
    			append_dev(label_1, t1);
    			append_dev(label_1, input);
    			append_dev(label_1, t2);
    			if (if_block) if_block.m(label_1, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t0, /*label*/ ctx[1]);

    			if (dirty & /*name*/ 1) {
    				attr_dev(input, "id", /*name*/ ctx[0]);
    			}

    			if (dirty & /*type*/ 8) {
    				attr_dev(input, "type", /*type*/ ctx[3]);
    			}

    			if (dirty & /*required*/ 16) {
    				prop_dev(input, "required", /*required*/ ctx[4]);
    			}

    			if (dirty & /*disabled*/ 256) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[8]);
    			}

    			if (/*required*/ ctx[4]) {
    				if (if_block) ; else {
    					if_block = create_if_block_4(ctx);
    					if_block.c();
    					if_block.m(label_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*name*/ 1) {
    				attr_dev(label_1, "for", /*name*/ ctx[0]);
    			}

    			if (dirty & /*classes*/ 32 && label_1_class_value !== (label_1_class_value = "" + (null_to_empty(/*classes*/ ctx[5]) + " svelte-nmjtwm"))) {
    				attr_dev(label_1, "class", label_1_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(16:0) {#if type === 'text'}",
    		ctx
    	});

    	return block;
    }

    // (20:2) {#if required}
    function create_if_block_4(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "This field is required.";
    			attr_dev(span, "class", "validation");
    			add_location(span, file$2, 20, 2, 632);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(20:2) {#if required}",
    		ctx
    	});

    	return block;
    }

    // (26:0) {#if type === 'radio'}
    function create_if_block_2(ctx) {
    	let input;
    	let t0;
    	let label_1;
    	let t1;

    	const block = {
    		c: function create() {
    			input = element("input");
    			t0 = space();
    			label_1 = element("label");
    			t1 = text(/*label*/ ctx[1]);
    			attr_dev(input, "type", /*type*/ ctx[3]);
    			attr_dev(input, "name", /*name*/ ctx[0]);
    			attr_dev(input, "id", /*input_id*/ ctx[2]);
    			input.value = /*value*/ ctx[7];
    			input.disabled = /*disabled*/ ctx[8];
    			input.checked = /*checked*/ ctx[6];
    			add_location(input, file$2, 26, 1, 737);
    			attr_dev(label_1, "for", /*input_id*/ ctx[2]);
    			add_location(label_1, file$2, 27, 1, 827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*type*/ 8) {
    				attr_dev(input, "type", /*type*/ ctx[3]);
    			}

    			if (dirty & /*name*/ 1) {
    				attr_dev(input, "name", /*name*/ ctx[0]);
    			}

    			if (dirty & /*input_id*/ 4) {
    				attr_dev(input, "id", /*input_id*/ ctx[2]);
    			}

    			if (dirty & /*value*/ 128 && input.value !== /*value*/ ctx[7]) {
    				prop_dev(input, "value", /*value*/ ctx[7]);
    			}

    			if (dirty & /*disabled*/ 256) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[8]);
    			}

    			if (dirty & /*checked*/ 64) {
    				prop_dev(input, "checked", /*checked*/ ctx[6]);
    			}

    			if (dirty & /*label*/ 2) set_data_dev(t1, /*label*/ ctx[1]);

    			if (dirty & /*input_id*/ 4) {
    				attr_dev(label_1, "for", /*input_id*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(26:0) {#if type === 'radio'}",
    		ctx
    	});

    	return block;
    }

    // (31:0) {#if type === 'date'}
    function create_if_block_1(ctx) {
    	let label_1;
    	let span;
    	let t0;
    	let t1;
    	let input;
    	let input_pattern_value;
    	let input_min_value;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			span = element("span");
    			t0 = text(/*label*/ ctx[1]);
    			t1 = space();
    			input = element("input");
    			attr_dev(span, "class", "label-title svelte-nmjtwm");
    			add_location(span, file$2, 32, 1, 923);
    			attr_dev(input, "type", /*type*/ ctx[3]);
    			attr_dev(input, "name", /*name*/ ctx[0]);
    			attr_dev(input, "pattern", input_pattern_value = "\\d" + 4 + "-\\d" + 2 + "-\\d" + 2);
    			attr_dev(input, "min", input_min_value = /*dateMethods*/ ctx[9]());
    			add_location(input, file$2, 33, 1, 965);
    			attr_dev(label_1, "for", /*input_id*/ ctx[2]);
    			add_location(label_1, file$2, 31, 1, 897);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, span);
    			append_dev(span, t0);
    			append_dev(label_1, t1);
    			append_dev(label_1, input);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t0, /*label*/ ctx[1]);

    			if (dirty & /*type*/ 8) {
    				attr_dev(input, "type", /*type*/ ctx[3]);
    			}

    			if (dirty & /*name*/ 1) {
    				attr_dev(input, "name", /*name*/ ctx[0]);
    			}

    			if (dirty & /*input_id*/ 4) {
    				attr_dev(label_1, "for", /*input_id*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(31:0) {#if type === 'date'}",
    		ctx
    	});

    	return block;
    }

    // (38:0) {#if type === 'heading'}
    function create_if_block(ctx) {
    	let h3;
    	let t;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(/*label*/ ctx[1]);
    			attr_dev(h3, "class", "svelte-nmjtwm");
    			add_location(h3, file$2, 38, 1, 1094);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(38:0) {#if type === 'heading'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let if_block3_anchor;
    	let if_block0 = /*type*/ ctx[3] === "text" && create_if_block_3(ctx);
    	let if_block1 = /*type*/ ctx[3] === "radio" && create_if_block_2(ctx);
    	let if_block2 = /*type*/ ctx[3] === "date" && create_if_block_1(ctx);
    	let if_block3 = /*type*/ ctx[3] === "heading" && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*type*/ ctx[3] === "text") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*type*/ ctx[3] === "radio") {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*type*/ ctx[3] === "date") {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*type*/ ctx[3] === "heading") {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block(ctx);
    					if_block3.c();
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { name } = $$props,
    		{ label } = $$props,
    		{ input_id = undefined } = $$props,
    		{ type } = $$props,
    		{ required = false } = $$props,
    		{ classes = undefined } = $$props,
    		{ checked = undefined } = $$props,
    		{ value = undefined } = $$props,
    		{ disabled = undefined } = $$props;

    	const dateMethods = () => {
    		let d = new Date();
    		let yy = `${d.getFullYear()}`;
    		let mm = `${d.getMonth()}`;
    		let dd = `${d.getDay()}`;
    		let pad = s => s.padStart(2, "0");
    		let date = `${pad(yy)}/${pad(mm)}/${dd}`;
    		return date;
    	};

    	const writable_props = [
    		"name",
    		"label",
    		"input_id",
    		"type",
    		"required",
    		"classes",
    		"checked",
    		"value",
    		"disabled"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FormInput> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FormInput", $$slots, []);

    	$$self.$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("input_id" in $$props) $$invalidate(2, input_id = $$props.input_id);
    		if ("type" in $$props) $$invalidate(3, type = $$props.type);
    		if ("required" in $$props) $$invalidate(4, required = $$props.required);
    		if ("classes" in $$props) $$invalidate(5, classes = $$props.classes);
    		if ("checked" in $$props) $$invalidate(6, checked = $$props.checked);
    		if ("value" in $$props) $$invalidate(7, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(8, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		label,
    		input_id,
    		type,
    		required,
    		classes,
    		checked,
    		value,
    		disabled,
    		dateMethods
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("input_id" in $$props) $$invalidate(2, input_id = $$props.input_id);
    		if ("type" in $$props) $$invalidate(3, type = $$props.type);
    		if ("required" in $$props) $$invalidate(4, required = $$props.required);
    		if ("classes" in $$props) $$invalidate(5, classes = $$props.classes);
    		if ("checked" in $$props) $$invalidate(6, checked = $$props.checked);
    		if ("value" in $$props) $$invalidate(7, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(8, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		label,
    		input_id,
    		type,
    		required,
    		classes,
    		checked,
    		value,
    		disabled,
    		dateMethods
    	];
    }

    class FormInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			name: 0,
    			label: 1,
    			input_id: 2,
    			type: 3,
    			required: 4,
    			classes: 5,
    			checked: 6,
    			value: 7,
    			disabled: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormInput",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<FormInput> was created without expected prop 'name'");
    		}

    		if (/*label*/ ctx[1] === undefined && !("label" in props)) {
    			console.warn("<FormInput> was created without expected prop 'label'");
    		}

    		if (/*type*/ ctx[3] === undefined && !("type" in props)) {
    			console.warn("<FormInput> was created without expected prop 'type'");
    		}
    	}

    	get name() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get input_id() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set input_id(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/form-elements/FormFieldset.svelte generated by Svelte v3.22.2 */
    const file$3 = "src/form-elements/FormFieldset.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (9:2) {#each inputs as input}
    function create_each_block$1(ctx) {
    	let current;
    	const forminput_spread_levels = [/*input*/ ctx[4]];
    	let forminput_props = {};

    	for (let i = 0; i < forminput_spread_levels.length; i += 1) {
    		forminput_props = assign(forminput_props, forminput_spread_levels[i]);
    	}

    	const forminput = new FormInput({ props: forminput_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(forminput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(forminput, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const forminput_changes = (dirty & /*inputs*/ 4)
    			? get_spread_update(forminput_spread_levels, [get_spread_object(/*input*/ ctx[4])])
    			: {};

    			forminput.$set(forminput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(forminput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(forminput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(forminput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:2) {#each inputs as input}",
    		ctx
    	});

    	return block;
    }

    // (14:1) {#if comment }
    function create_if_block$1(ctx) {
    	let div;
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(/*comment*/ ctx[3]);
    			add_location(p, file$3, 15, 3, 330);
    			attr_dev(div, "class", "fieldset-comment");
    			add_location(div, file$3, 14, 2, 296);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*comment*/ 8) set_data_dev(t, /*comment*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(14:1) {#if comment }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let fieldset;
    	let legend;
    	let t0;
    	let t1;
    	let div;
    	let t2;
    	let current;
    	let each_value = /*inputs*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block = /*comment*/ ctx[3] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			fieldset = element("fieldset");
    			legend = element("legend");
    			t0 = text(/*f_legend*/ ctx[1]);
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block) if_block.c();
    			add_location(legend, file$3, 6, 1, 146);
    			attr_dev(div, "class", "fieldset-inputs");
    			add_location(div, file$3, 7, 1, 175);
    			attr_dev(fieldset, "id", /*f_id*/ ctx[0]);
    			add_location(fieldset, file$3, 5, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, fieldset, anchor);
    			append_dev(fieldset, legend);
    			append_dev(legend, t0);
    			append_dev(fieldset, t1);
    			append_dev(fieldset, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(fieldset, t2);
    			if (if_block) if_block.m(fieldset, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*f_legend*/ 2) set_data_dev(t0, /*f_legend*/ ctx[1]);

    			if (dirty & /*inputs*/ 4) {
    				each_value = /*inputs*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (/*comment*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(fieldset, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (!current || dirty & /*f_id*/ 1) {
    				attr_dev(fieldset, "id", /*f_id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { f_id } = $$props,
    		{ f_legend } = $$props,
    		{ inputs } = $$props,
    		{ comment = undefined } = $$props;

    	const writable_props = ["f_id", "f_legend", "inputs", "comment"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FormFieldset> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FormFieldset", $$slots, []);

    	$$self.$set = $$props => {
    		if ("f_id" in $$props) $$invalidate(0, f_id = $$props.f_id);
    		if ("f_legend" in $$props) $$invalidate(1, f_legend = $$props.f_legend);
    		if ("inputs" in $$props) $$invalidate(2, inputs = $$props.inputs);
    		if ("comment" in $$props) $$invalidate(3, comment = $$props.comment);
    	};

    	$$self.$capture_state = () => ({
    		f_id,
    		f_legend,
    		inputs,
    		comment,
    		FormInput
    	});

    	$$self.$inject_state = $$props => {
    		if ("f_id" in $$props) $$invalidate(0, f_id = $$props.f_id);
    		if ("f_legend" in $$props) $$invalidate(1, f_legend = $$props.f_legend);
    		if ("inputs" in $$props) $$invalidate(2, inputs = $$props.inputs);
    		if ("comment" in $$props) $$invalidate(3, comment = $$props.comment);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [f_id, f_legend, inputs, comment];
    }

    class FormFieldset extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			f_id: 0,
    			f_legend: 1,
    			inputs: 2,
    			comment: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormFieldset",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*f_id*/ ctx[0] === undefined && !("f_id" in props)) {
    			console.warn("<FormFieldset> was created without expected prop 'f_id'");
    		}

    		if (/*f_legend*/ ctx[1] === undefined && !("f_legend" in props)) {
    			console.warn("<FormFieldset> was created without expected prop 'f_legend'");
    		}

    		if (/*inputs*/ ctx[2] === undefined && !("inputs" in props)) {
    			console.warn("<FormFieldset> was created without expected prop 'inputs'");
    		}
    	}

    	get f_id() {
    		throw new Error("<FormFieldset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set f_id(value) {
    		throw new Error("<FormFieldset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get f_legend() {
    		throw new Error("<FormFieldset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set f_legend(value) {
    		throw new Error("<FormFieldset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputs() {
    		throw new Error("<FormFieldset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputs(value) {
    		throw new Error("<FormFieldset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get comment() {
    		throw new Error("<FormFieldset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set comment(value) {
    		throw new Error("<FormFieldset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const env = () => {
      const url = window.location.hostname;
      const pkey =
        url === "stingingfly.org"
          ? "pk_live_EPVd6u1amDegfDhpvbp57swa"
          : "pk_test_0lhyoG9gxOmK5V15FobQbpUs";
      const endpoint =
        url === "stingingfly.org"
          ? "https://stingingfly.org/stripe/api/index.php"
          : "http://localhost:8001/api/subscribers";
      return {
        url: url,
        pkey: pkey,
        endpoint: endpoint
      };
    };

    const createStripeToken = async (card, options, stripe) => {
      try {
        const result = await stripe.createToken(card, options);
        if (result.error) {
          throw result.error.message;
        }
        return result.token;
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    const formData = (form, token) => {
      let v = el => (form.querySelector(el) ? form.querySelector(el).value : null);

      let obj = {
        first_name: v("#first_name"),
        last_name: v("#last_name"),
        email: v("#email"),
        address_line1: v("#address_line1"),
        address_line2: v("#address_line2"),
        address_city: v("#address_city"),
        address_country: v("#address_country"),
        address_postcode: v("#address_postcode"),
        issue: v('input[name="issue"]:checked'),
        delivery: v('input[name="delivery"]:checked'),
        stripeToken: token.id
      };
      return JSON.stringify(obj);
    };

    const handlePost = async (form, token, url) => {
      console.log(form, token, url);
      let p = await fetch(url, {
        method: "POST",
        body: formData(form, token),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      return p.json();
    };

    const handleSuccess = result => {
      console.log(result);
    };

    // Handle SCA Confirmation
    const handle_sca_confirmation = function(
      client_secret,
      card,
      stripe,
      errorElement,
      successCallback
    ) {
      stripe.handleCardPayment(client_secret, card).then(function(result) {
        if (result.error) {
          // Display error.message in your UI.
          errorElement.textContent = result.error.message;
        } else {
          // The payment has succeeded. Display a success message.
          setTimeout(() => {
            successCallback();
          }, 150);
        }
      });
    };

    const handleFailure = res => {
      console.log(res);
      switch (res.message) {
        case "customer_exists":
          setTimeout(() => {
            console.log(res.message);
          }, 250);
          break;

        case "confirmation_needed":
          handle_sca_confirmation(res.data.client_secret, card);
          break;

        default:
          setTimeout(() => {
            console.log(res.message);
          }, 250);
          break;
      }
    };

    const handleFormSubmit = async (e, card, stripe, url) => {
      e.preventDefault();
      let f = document.getElementById("payment-form");
      let first_name = document.getElementById("first_name").value;
      let last_name = document.getElementById("last_name").value;
      let stripeName = `${first_name} ${last_name}`;
      var options = {
        // Stripe Info
        name: stripeName,
        email: document.getElementById("email").value,
        address_line1: document.getElementById("address_line1").value,
        address_line2: document.getElementById("address_line2").value,
        address_city: document.getElementById("address_city").value,
        address_country: document.getElementById("address_country").value,
        address_zip: document.getElementById("address_postcode").value
      };
      try {
        let stripeToken = await createStripeToken(card, options, stripe);
        let result = await handlePost(f, stripeToken, url);
        result.success ? handleSuccess(result) : handleFailure(result);
      } catch (error) {
        console.log(error);
      }
    };

    /* src/form-elements/StripeElement.svelte generated by Svelte v3.22.2 */
    const file$4 = "src/form-elements/StripeElement.svelte";

    function create_fragment$4(ctx) {
    	let fieldset;
    	let legend;
    	let t1;
    	let label;
    	let t3;
    	let div0;
    	let t4;
    	let p0;
    	let t6;
    	let div1;
    	let t7;
    	let button;
    	let t9;
    	let div2;
    	let p1;
    	let dispose;

    	const block = {
    		c: function create() {
    			fieldset = element("fieldset");
    			legend = element("legend");
    			legend.textContent = "How would you like to pay for it?";
    			t1 = space();
    			label = element("label");
    			label.textContent = "Your Card Details";
    			t3 = space();
    			div0 = element("div");
    			t4 = space();
    			p0 = element("p");
    			p0.textContent = "We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.";
    			t6 = space();
    			div1 = element("div");
    			t7 = space();
    			button = element("button");
    			button.textContent = "Subscribe";
    			t9 = space();
    			div2 = element("div");
    			p1 = element("p");
    			p1.textContent = "When you click 'subscribe', your card will be charged, and you will receive an email with the full details of your subscription, including how to access our online archive.";
    			add_location(legend, file$4, 48, 1, 1244);
    			attr_dev(label, "for", "card-element");
    			attr_dev(label, "class", "svelte-1ytjumv");
    			add_location(label, file$4, 50, 1, 1346);
    			attr_dev(div0, "id", "card-element");
    			add_location(div0, file$4, 51, 1, 1399);
    			attr_dev(p0, "class", "stripe-info");
    			add_location(p0, file$4, 52, 1, 1430);
    			attr_dev(div1, "id", "card-errors");
    			add_location(div1, file$4, 53, 1, 1573);
    			attr_dev(button, "id", "submit-button");
    			add_location(button, file$4, 54, 1, 1603);
    			add_location(p1, file$4, 56, 2, 1707);
    			attr_dev(div2, "class", "fieldset-comment");
    			add_location(div2, file$4, 55, 1, 1674);
    			attr_dev(fieldset, "id", "sub_payment");
    			add_location(fieldset, file$4, 47, 0, 1215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, fieldset, anchor);
    			append_dev(fieldset, legend);
    			append_dev(fieldset, t1);
    			append_dev(fieldset, label);
    			append_dev(fieldset, t3);
    			append_dev(fieldset, div0);
    			append_dev(fieldset, t4);
    			append_dev(fieldset, p0);
    			append_dev(fieldset, t6);
    			append_dev(fieldset, div1);
    			append_dev(fieldset, t7);
    			append_dev(fieldset, button);
    			append_dev(fieldset, t9);
    			append_dev(fieldset, div2);
    			append_dev(div2, p1);
    			if (remount) dispose();
    			dispose = listen_dev(button, "click", /*handleSubmit*/ ctx[0], false, false, false);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const { url, pkey, endpoint } = env();

    	/* Initiate Stripe */
    	const stripe = window.Stripe(pkey);

    	const elements = stripe.elements();

    	// Create an instance of the card Element
    	const card = elements.create("card", {
    		style: {
    			base: {
    				color: "#32325d",
    				fontFamily: "\"Helvetica Neue\", Helvetica, sans-serif",
    				fontSmoothing: "antialiased",
    				fontSize: "15px",
    				"::placeholder": { color: "#aab7c4" }
    			},
    			invalid: { color: "#fa755a", iconColor: "#fa755a" }
    		}
    	});

    	// Add an instance of the card Element into the `card-element` <div>
    	onMount(() => {
    		card.mount("#card-element");
    		const errorElement = document.getElementById("card-errors");

    		// Handle real-time validation errors from the card Element.
    		card.addEventListener("change", function (event) {
    			if (event.error) {
    				errorElement.textContent = event.error.message;
    			} else {
    				errorElement.textContent = "";
    			}
    		});
    	});

    	const handleSubmit = e => handleFormSubmit(e, card, stripe, endpoint);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<StripeElement> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("StripeElement", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		env,
    		handleFormSubmit,
    		url,
    		pkey,
    		endpoint,
    		stripe,
    		elements,
    		card,
    		handleSubmit
    	});

    	return [handleSubmit];
    }

    class StripeElement extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StripeElement",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/forms/MagForm.svelte generated by Svelte v3.22.2 */
    const file$5 = "src/forms/MagForm.svelte";

    // (116:1) {#if gift == true}
    function create_if_block$2(ctx) {
    	let current;

    	const formfieldset = new FormFieldset({
    			props: {
    				f_id: "sub_gifter",
    				f_legend: "Your Contact Details",
    				inputs: /*inputs*/ ctx[1].gifter_inputs,
    				comment: /*comments*/ ctx[2].gifter_comment
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfieldset.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfieldset, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfieldset_changes = {};
    			if (dirty & /*inputs*/ 2) formfieldset_changes.inputs = /*inputs*/ ctx[1].gifter_inputs;
    			if (dirty & /*comments*/ 4) formfieldset_changes.comment = /*comments*/ ctx[2].gifter_comment;
    			formfieldset.$set(formfieldset_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfieldset.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfieldset.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfieldset, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(116:1) {#if gift == true}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let form;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let current;

    	const formfieldset0 = new FormFieldset({
    			props: {
    				f_id: "sub_gift_toggle",
    				f_legend: "Is this subscription for you, or someone else?",
    				inputs: /*inputs*/ ctx[1].gift_toggle_inputs
    			},
    			$$inline: true
    		});

    	const formfieldset1 = new FormFieldset({
    			props: {
    				f_id: "sub_contact",
    				f_legend: "Who should we send it to?",
    				inputs: /*inputs*/ ctx[1].contact_inputs,
    				comment: /*comments*/ ctx[2].contact_comment
    			},
    			$$inline: true
    		});

    	let if_block = /*gift*/ ctx[0] == true && create_if_block$2(ctx);

    	const formfieldset2 = new FormFieldset({
    			props: {
    				f_id: "sub_address",
    				f_legend: "Where should we send it?",
    				inputs: /*inputs*/ ctx[1].address_inputs,
    				comment: /*comments*/ ctx[2].address_comment
    			},
    			$$inline: true
    		});

    	const formfieldset3 = new FormFieldset({
    			props: {
    				f_id: "sub_start",
    				f_legend: "When would you like the subscription to start?",
    				inputs: /*inputs*/ ctx[1].start_inputs,
    				comment: /*comments*/ ctx[2].start_comment
    			},
    			$$inline: true
    		});

    	const stripeelement = new StripeElement({ $$inline: true });

    	const block = {
    		c: function create() {
    			form = element("form");
    			create_component(formfieldset0.$$.fragment);
    			t0 = space();
    			create_component(formfieldset1.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(formfieldset2.$$.fragment);
    			t3 = space();
    			create_component(formfieldset3.$$.fragment);
    			t4 = space();
    			create_component(stripeelement.$$.fragment);
    			attr_dev(form, "action", "");
    			attr_dev(form, "method", "post");
    			attr_dev(form, "class", "payment-form");
    			attr_dev(form, "id", "payment-form");
    			add_location(form, file$5, 109, 0, 4225);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			mount_component(formfieldset0, form, null);
    			append_dev(form, t0);
    			mount_component(formfieldset1, form, null);
    			append_dev(form, t1);
    			if (if_block) if_block.m(form, null);
    			append_dev(form, t2);
    			mount_component(formfieldset2, form, null);
    			append_dev(form, t3);
    			mount_component(formfieldset3, form, null);
    			append_dev(form, t4);
    			mount_component(stripeelement, form, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const formfieldset0_changes = {};
    			if (dirty & /*inputs*/ 2) formfieldset0_changes.inputs = /*inputs*/ ctx[1].gift_toggle_inputs;
    			formfieldset0.$set(formfieldset0_changes);
    			const formfieldset1_changes = {};
    			if (dirty & /*inputs*/ 2) formfieldset1_changes.inputs = /*inputs*/ ctx[1].contact_inputs;
    			if (dirty & /*comments*/ 4) formfieldset1_changes.comment = /*comments*/ ctx[2].contact_comment;
    			formfieldset1.$set(formfieldset1_changes);

    			if (/*gift*/ ctx[0] == true) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*gift*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(form, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const formfieldset2_changes = {};
    			if (dirty & /*inputs*/ 2) formfieldset2_changes.inputs = /*inputs*/ ctx[1].address_inputs;
    			if (dirty & /*comments*/ 4) formfieldset2_changes.comment = /*comments*/ ctx[2].address_comment;
    			formfieldset2.$set(formfieldset2_changes);
    			const formfieldset3_changes = {};
    			if (dirty & /*inputs*/ 2) formfieldset3_changes.inputs = /*inputs*/ ctx[1].start_inputs;
    			if (dirty & /*comments*/ 4) formfieldset3_changes.comment = /*comments*/ ctx[2].start_comment;
    			formfieldset3.$set(formfieldset3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfieldset0.$$.fragment, local);
    			transition_in(formfieldset1.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(formfieldset2.$$.fragment, local);
    			transition_in(formfieldset3.$$.fragment, local);
    			transition_in(stripeelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfieldset0.$$.fragment, local);
    			transition_out(formfieldset1.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(formfieldset2.$$.fragment, local);
    			transition_out(formfieldset3.$$.fragment, local);
    			transition_out(stripeelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_component(formfieldset0);
    			destroy_component(formfieldset1);
    			if (if_block) if_block.d();
    			destroy_component(formfieldset2);
    			destroy_component(formfieldset3);
    			destroy_component(stripeelement);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	const spush = (array, item_to_add) => [...array, item_to_add];
    	const spop = (array, attr, name) => array.filter(i => i[attr] !== name);
    	let gift = false;
    	const dispatch = createEventDispatcher();

    	const meta = {
    		current_number: document.querySelector(".meta").dataset.current,
    		current_title: document.querySelector(".meta").dataset.title,
    		next_issue_number: parseInt(document.querySelector(".meta").dataset.current) + 1,
    		next_issue_title: `Issue ${parseInt(document.querySelector(".meta").dataset.current) + 1} / Volume 2`
    	};

    	let inputs = {
    		gift_toggle_inputs: [
    			{
    				type: "radio",
    				label: "It's For Me",
    				name: "gift",
    				input_id: "gift_no",
    				value: "false",
    				checked: true
    			},
    			{
    				type: "radio",
    				label: "It's A Gift",
    				name: "gift",
    				input_id: "gift_yes",
    				value: "true",
    				checked: false
    			}
    		],
    		contact_inputs: [
    			{
    				name: "first_name",
    				label: "First Name",
    				type: "text",
    				required: true,
    				classes: "half-width"
    			},
    			{
    				name: "last_name",
    				label: "Last Name",
    				type: "text",
    				required: true,
    				classes: "half-width"
    			},
    			{
    				name: "email",
    				label: "Email",
    				type: "text",
    				required: true,
    				classes: "full-width"
    			}
    		],
    		gifter_inputs: [
    			{
    				name: "gifter_first_name",
    				label: "First Name",
    				type: "text",
    				required: true,
    				classes: "half-width"
    			},
    			{
    				name: "gifter_last_name",
    				label: "Last Name",
    				type: "text",
    				required: true,
    				classes: "half-width"
    			},
    			{
    				name: "gifter_email",
    				label: "Email",
    				type: "text",
    				required: true,
    				classes: "full-width"
    			}
    		],
    		address_inputs: [
    			{
    				name: "address_line1",
    				label: "Address Line 1",
    				type: "text",
    				required: true,
    				classes: "full-width"
    			},
    			{
    				name: "address_line2",
    				label: "Address Line 2",
    				type: "text",
    				required: true,
    				classes: "full-width"
    			},
    			{
    				name: "address_city",
    				label: "City",
    				type: "text",
    				classes: "third-width"
    			},
    			{
    				name: "address_postcode",
    				label: "Postcode",
    				type: "text",
    				classes: "third-width"
    			},
    			{
    				name: "address_country",
    				label: "Country",
    				type: "text",
    				classes: "third-width"
    			},
    			{
    				type: "heading",
    				label: "Select your delivery region"
    			},
    			{
    				type: "radio",
    				name: "delivery",
    				input_id: "irl",
    				value: "irl",
    				checked: true,
    				label: "Ireland & Northern Ireland"
    			},
    			{
    				type: "radio",
    				name: "delivery",
    				input_id: "row",
    				value: "row",
    				checked: false,
    				label: "Rest of the World"
    			}
    		],
    		start_inputs: [
    			{
    				type: "radio",
    				input_id: "current_issue",
    				name: "issue",
    				value: meta.current_number,
    				disabled: true,
    				checked: false,
    				label: meta.current_title
    			},
    			{
    				type: "radio",
    				input_id: "next_issue",
    				name: "issue",
    				value: meta.next_issue_number,
    				disabled: false,
    				checked: true,
    				label: meta.next_issue_title
    			}
    		]
    	};

    	let comments = {
    		contact_comment: "The name and email address of the recipient",
    		gifter_comment: "We’ll need your name and email address too, just so we can send you a receipt.",
    		address_comment: "This is the address where we’ll be sending the issues.",
    		start_comment: "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year."
    	};

    	const handleGift = e => {
    		if (e.target.checked) {
    			$$invalidate(0, gift = JSON.parse(e.target.value));

    			if (gift) {
    				$$invalidate(
    					1,
    					inputs.start_inputs = spush(inputs.start_inputs, {
    						type: "date",
    						label: "On what date should the gift subscription begin?",
    						name: "gift_start_date"
    					}),
    					inputs
    				);

    				$$invalidate(2, comments.start_comment = $$invalidate(2, comments.start_comment += " You can also choose a specific date for the subscription to start. This is when the person receiving the gift will be notified.", comments), comments);
    			} else {
    				$$invalidate(1, inputs.start_inputs = spop(inputs.start_inputs, "name", "gift_start_date"), inputs);
    				$$invalidate(2, comments.start_comment = "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year.", comments);
    			}
    		}
    	};

    	onMount(() => {
    		// Gift Toggle
    		let giftButtons = document.querySelectorAll("input[name='gift']");

    		[...giftButtons].forEach(el => {
    			el.addEventListener("change", handleGift);
    		});
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MagForm> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("MagForm", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		FormFieldset,
    		StripeElement,
    		spush,
    		spop,
    		gift,
    		dispatch,
    		meta,
    		inputs,
    		comments,
    		handleGift
    	});

    	$$self.$inject_state = $$props => {
    		if ("gift" in $$props) $$invalidate(0, gift = $$props.gift);
    		if ("inputs" in $$props) $$invalidate(1, inputs = $$props.inputs);
    		if ("comments" in $$props) $$invalidate(2, comments = $$props.comments);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [gift, inputs, comments];
    }

    class MagForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MagForm",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/forms/BookForm.svelte generated by Svelte v3.22.2 */

    const file$6 = "src/forms/BookForm.svelte";

    function create_fragment$6(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "This is the Book Only Form";
    			add_location(h2, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BookForm> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BookForm", $$slots, []);
    	return [];
    }

    class BookForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BookForm",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/forms/MBForm.svelte generated by Svelte v3.22.2 */

    const file$7 = "src/forms/MBForm.svelte";

    function create_fragment$7(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "This is the Mag + Book Form";
    			add_location(h2, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MBForm> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("MBForm", $$slots, []);
    	return [];
    }

    class MBForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MBForm",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/forms/PatronForm.svelte generated by Svelte v3.22.2 */

    const file$8 = "src/forms/PatronForm.svelte";

    function create_fragment$8(ctx) {
    	let h2;
    	let t1;
    	let form;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "This is the Patron Form";
    			t1 = space();
    			form = element("form");
    			add_location(h2, file$8, 0, 0, 0);
    			attr_dev(form, "action", "");
    			attr_dev(form, "method", "post");
    			attr_dev(form, "class", "payment-form");
    			attr_dev(form, "id", "payment-form__patrons");
    			add_location(form, file$8, 2, 0, 34);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, form, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(form);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PatronForm> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("PatronForm", $$slots, []);
    	return [];
    }

    class PatronForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PatronForm",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/forms/SubForm.svelte generated by Svelte v3.22.2 */

    // (9:0) {#if form === 'magonly'}
    function create_if_block_3$1(ctx) {
    	let current;
    	const magform = new MagForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(magform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(magform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(magform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(magform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(magform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(9:0) {#if form === 'magonly'}",
    		ctx
    	});

    	return block;
    }

    // (13:0) {#if form === 'bookonly'}
    function create_if_block_2$1(ctx) {
    	let current;
    	const bookform = new BookForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(bookform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bookform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bookform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bookform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bookform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(13:0) {#if form === 'bookonly'}",
    		ctx
    	});

    	return block;
    }

    // (17:0) {#if form === 'magbook'}
    function create_if_block_1$1(ctx) {
    	let current;
    	const mbform = new MBForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mbform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mbform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mbform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mbform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mbform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(17:0) {#if form === 'magbook'}",
    		ctx
    	});

    	return block;
    }

    // (21:0) {#if form === 'patron'}
    function create_if_block$3(ctx) {
    	let current;
    	const patronform = new PatronForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(patronform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(patronform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(patronform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(patronform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(patronform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(21:0) {#if form === 'patron'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let if_block3_anchor;
    	let current;
    	let if_block0 = /*form*/ ctx[0] === "magonly" && create_if_block_3$1(ctx);
    	let if_block1 = /*form*/ ctx[0] === "bookonly" && create_if_block_2$1(ctx);
    	let if_block2 = /*form*/ ctx[0] === "magbook" && create_if_block_1$1(ctx);
    	let if_block3 = /*form*/ ctx[0] === "patron" && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*form*/ ctx[0] === "magonly") {
    				if (if_block0) {
    					if (dirty & /*form*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*form*/ ctx[0] === "bookonly") {
    				if (if_block1) {
    					if (dirty & /*form*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*form*/ ctx[0] === "magbook") {
    				if (if_block2) {
    					if (dirty & /*form*/ 1) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*form*/ ctx[0] === "patron") {
    				if (if_block3) {
    					if (dirty & /*form*/ 1) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block$3(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { form } = $$props;
    	const writable_props = ["form"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SubForm> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SubForm", $$slots, []);

    	$$self.$set = $$props => {
    		if ("form" in $$props) $$invalidate(0, form = $$props.form);
    	};

    	$$self.$capture_state = () => ({
    		MagForm,
    		BookForm,
    		MBForm,
    		PatronForm,
    		form
    	});

    	$$self.$inject_state = $$props => {
    		if ("form" in $$props) $$invalidate(0, form = $$props.form);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [form];
    }

    class SubForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { form: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SubForm",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*form*/ ctx[0] === undefined && !("form" in props)) {
    			console.warn("<SubForm> was created without expected prop 'form'");
    		}
    	}

    	get form() {
    		throw new Error("<SubForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<SubForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.22.2 */
    const file$9 = "src/App.svelte";

    function create_fragment$a(ctx) {
    	let t;
    	let div;
    	let current;
    	const formheader = new FormHeader({ $$inline: true });
    	formheader.$on("formSelect", /*formSelect_handler*/ ctx[1]);

    	const subform = new SubForm({
    			props: { form: /*form*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formheader.$$.fragment);
    			t = space();
    			div = element("div");
    			create_component(subform.$$.fragment);
    			attr_dev(div, "id", "subs-page__form");
    			add_location(div, file$9, 9, 0, 206);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(formheader, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(subform, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const subform_changes = {};
    			if (dirty & /*form*/ 1) subform_changes.form = /*form*/ ctx[0];
    			subform.$set(subform_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formheader.$$.fragment, local);
    			transition_in(subform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formheader.$$.fragment, local);
    			transition_out(subform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formheader, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_component(subform);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let form = "magonly";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const formSelect_handler = e => $$invalidate(0, form = e.detail);
    	$$self.$capture_state = () => ({ FormHeader, SubForm, form });

    	$$self.$inject_state = $$props => {
    		if ("form" in $$props) $$invalidate(0, form = $$props.form);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [form, formSelect_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    const app = new App({
      target: document.querySelector("#svelte")
    });

    return app;

}());
//# sourceMappingURL=form.js.map
