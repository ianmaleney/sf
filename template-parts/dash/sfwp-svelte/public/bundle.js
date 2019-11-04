
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (const k in src) tar[k] = src[k];
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

	function validate_store(store, name) {
		if (!store || typeof store.subscribe !== 'function') {
			throw new Error(`'${name}' is not a store with a 'subscribe' method`);
		}
	}

	function subscribe(component, store, callback) {
		const unsub = store.subscribe(callback);

		component.$$.on_destroy.push(unsub.unsubscribe
			? () => unsub.unsubscribe()
			: unsub);
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
			if (iterations[i]) iterations[i].d(detaching);
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

	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function children(element) {
		return Array.from(element.childNodes);
	}

	function set_data(text, data) {
		data = '' + data;
		if (text.data !== data) text.data = data;
	}

	let current_component;

	function set_current_component(component) {
		current_component = component;
	}

	const dirty_components = [];

	const resolved_promise = Promise.resolve();
	let update_scheduled = false;
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];

	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	function flush() {
		const seen_callbacks = new Set();

		do {
			// first, call beforeUpdate functions
			// and update components
			while (dirty_components.length) {
				const component = dirty_components.shift();
				set_current_component(component);
				update(component.$$);
			}

			while (binding_callbacks.length) binding_callbacks.shift()();

			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			while (render_callbacks.length) {
				const callback = render_callbacks.pop();
				if (!seen_callbacks.has(callback)) {
					callback();

					// ...so guard against infinite loops
					seen_callbacks.add(callback);
				}
			}
		} while (dirty_components.length);

		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}

		update_scheduled = false;
	}

	function update($$) {
		if ($$.fragment) {
			$$.update($$.dirty);
			run_all($$.before_render);
			$$.fragment.p($$.dirty, $$.ctx);
			$$.dirty = null;

			$$.after_render.forEach(add_render_callback);
		}
	}

	let outros;

	function group_outros() {
		outros = {
			remaining: 0,
			callbacks: []
		};
	}

	function check_outros() {
		if (!outros.remaining) {
			run_all(outros.callbacks);
		}
	}

	function on_outro(callback) {
		outros.callbacks.push(callback);
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
					if (!(key in n)) to_null_out[key] = 1;
				}

				for (const key in n) {
					if (!accounted_for[key]) {
						update[key] = n[key];
						accounted_for[key] = 1;
					}
				}

				levels[i] = n;
			} else {
				for (const key in o) {
					accounted_for[key] = 1;
				}
			}
		}

		for (const key in to_null_out) {
			if (!(key in update)) update[key] = undefined;
		}

		return update;
	}

	function mount_component(component, target, anchor) {
		const { fragment, on_mount, on_destroy, after_render } = component.$$;

		fragment.m(target, anchor);

		// onMount happens after the initial afterUpdate. Because
		// afterUpdate callbacks happen in reverse order (inner first)
		// we schedule onMount callbacks before afterUpdate callbacks
		add_render_callback(() => {
			const new_on_destroy = on_mount.map(run).filter(is_function);
			if (on_destroy) {
				on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});

		after_render.forEach(add_render_callback);
	}

	function destroy(component, detaching) {
		if (component.$$) {
			run_all(component.$$.on_destroy);
			component.$$.fragment.d(detaching);

			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			component.$$.on_destroy = component.$$.fragment = null;
			component.$$.ctx = {};
		}
	}

	function make_dirty(component, key) {
		if (!component.$$.dirty) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty = blank_object();
		}
		component.$$.dirty[key] = true;
	}

	function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
		const parent_component = current_component;
		set_current_component(component);

		const props = options.props || {};

		const $$ = component.$$ = {
			fragment: null,
			ctx: null,

			// state
			props: prop_names,
			update: noop,
			not_equal: not_equal$$1,
			bound: blank_object(),

			// lifecycle
			on_mount: [],
			on_destroy: [],
			before_render: [],
			after_render: [],
			context: new Map(parent_component ? parent_component.$$.context : []),

			// everything else
			callbacks: blank_object(),
			dirty: null
		};

		let ready = false;

		$$.ctx = instance
			? instance(component, props, (key, value) => {
				if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
					if ($$.bound[key]) $$.bound[key](value);
					if (ready) make_dirty(component, key);
				}
			})
			: props;

		$$.update();
		ready = true;
		run_all($$.before_render);
		$$.fragment = create_fragment($$.ctx);

		if (options.target) {
			if (options.hydrate) {
				$$.fragment.l(children(options.target));
			} else {
				$$.fragment.c();
			}

			if (options.intro && component.$$.fragment.i) component.$$.fragment.i();
			mount_component(component, options.target, options.anchor);
			flush();
		}

		set_current_component(parent_component);
	}

	class SvelteComponent {
		$destroy() {
			destroy(this, true);
			this.$destroy = noop;
		}

		$on(type, callback) {
			const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
			callbacks.push(callback);

			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		$set() {
			// overridden by instance, if it has props
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
	}

	/* src/SingleSub.svelte generated by Svelte v3.2.2 */

	const file = "src/SingleSub.svelte";

	function create_fragment(ctx) {
		var li, section0, h1, t0, t1, t2, t3, section1, div0, a0, t4, a0_href_value, t5, p0, strong0, t7, t8, t9, p1, strong1, t11, t12, t13, div3, div1, p2, t14, t15, p3, t16, t17, p4, t18, t19, p5, t20, t21, p6, t22, t23, div2, button0, t24, t25, button1, t26, t27, button2, t28, t29, div4, p7, strong2, t31, t32, t33, p8, strong3, t35, t36, t37, p9, strong4, t39, t40, t41, p10, strong5, t43, a1, t44, t45, t46, a1_href_value, t47, div5, button3, t48, button3_disabled_value, t49, p11, t51, button4, li_id_value, dispose;

		return {
			c: function create() {
				li = element("li");
				section0 = element("section");
				h1 = element("h1");
				t0 = text(ctx.first_name);
				t1 = space();
				t2 = text(ctx.last_name);
				t3 = space();
				section1 = element("section");
				div0 = element("div");
				a0 = element("a");
				t4 = text(ctx.email);
				t5 = space();
				p0 = element("p");
				strong0 = element("strong");
				strong0.textContent = "Subscribed:";
				t7 = space();
				t8 = text(ctx.date_start);
				t9 = space();
				p1 = element("p");
				strong1 = element("strong");
				strong1.textContent = "Status:";
				t11 = space();
				t12 = text(ctx.sub_status);
				t13 = space();
				div3 = element("div");
				div1 = element("div");
				p2 = element("p");
				t14 = text(ctx.address_one);
				t15 = space();
				p3 = element("p");
				t16 = text(ctx.address_two);
				t17 = space();
				p4 = element("p");
				t18 = text(ctx.city);
				t19 = space();
				p5 = element("p");
				t20 = text(ctx.country);
				t21 = space();
				p6 = element("p");
				t22 = text(ctx.postcode);
				t23 = space();
				div2 = element("div");
				button0 = element("button");
				t24 = text("Save");
				t25 = space();
				button1 = element("button");
				t26 = text("Cancel");
				t27 = space();
				button2 = element("button");
				t28 = text("Edit Address");
				t29 = space();
				div4 = element("div");
				p7 = element("p");
				strong2 = element("strong");
				strong2.textContent = "Starting Issue:";
				t31 = space();
				t32 = text(ctx.start_issue);
				t33 = space();
				p8 = element("p");
				strong3 = element("strong");
				strong3.textContent = "Last Issue:";
				t35 = space();
				t36 = text(ctx.subscribe_until);
				t37 = space();
				p9 = element("p");
				strong4 = element("strong");
				strong4.textContent = "Access Ends:";
				t39 = space();
				t40 = text(ctx.next_renewal_date);
				t41 = space();
				p10 = element("p");
				strong5 = element("strong");
				strong5.textContent = "Username:";
				t43 = space();
				a1 = element("a");
				t44 = text(ctx.first_name);
				t45 = text(ctx.last_name);
				t46 = text(ctx.sub_id);
				t47 = space();
				div5 = element("div");
				button3 = element("button");
				t48 = text("Cancel Subscription");
				t49 = space();
				p11 = element("p");
				p11.textContent = "The subscriber will retain access to the online archive until their subscription expires. This is the same as removing ‘auto-renewal’.";
				t51 = space();
				button4 = element("button");
				button4.textContent = "+ More";
				h1.className = "svelte-r8skmg";
				add_location(h1, file, 245, 2, 6365);
				add_location(section0, file, 244, 1, 6353);
				a0.href = a0_href_value = "mailto:" + ctx.email;
				a0.className = "svelte-r8skmg";
				add_location(a0, file, 249, 3, 6529);
				add_location(strong0, file, 250, 6, 6572);
				p0.className = "svelte-r8skmg";
				add_location(p0, file, 250, 3, 6569);
				add_location(strong1, file, 251, 6, 6624);
				p1.className = "svelte-r8skmg";
				add_location(p1, file, 251, 3, 6621);
				div0.className = "subscriber-card__info-section subscriber-card__basic-info svelte-r8skmg";
				add_location(div0, file, 248, 2, 6454);
				p2.className = "address-line svelte-r8skmg";
				add_location(p2, file, 255, 4, 6782);
				p3.className = "address-line svelte-r8skmg";
				add_location(p3, file, 256, 4, 6829);
				p4.className = "address-line svelte-r8skmg";
				add_location(p4, file, 257, 4, 6876);
				p5.className = "address-line svelte-r8skmg";
				add_location(p5, file, 258, 4, 6916);
				p6.className = "address-line svelte-r8skmg";
				add_location(p6, file, 259, 4, 6959);
				div1.className = "address-inputs";
				add_location(div1, file, 254, 3, 6749);
				button0.dataset.sub = ctx.sub_id;
				button0.dataset.stripe = ctx.stripe_customer_id;
				button0.id = "address-save";
				button0.className = "svelte-r8skmg";
				add_location(button0, file, 262, 4, 7046);
				button1.dataset.sub = ctx.sub_id;
				button1.dataset.stripe = ctx.stripe_customer_id;
				button1.id = "address-cancel";
				button1.className = "svelte-r8skmg";
				add_location(button1, file, 263, 4, 7174);
				button2.dataset.sub = ctx.sub_id;
				button2.dataset.stripe = ctx.stripe_customer_id;
				button2.id = "address-edit";
				button2.className = "svelte-r8skmg";
				add_location(button2, file, 264, 4, 7308);
				div2.className = "address-buttons svelte-r8skmg";
				add_location(div2, file, 261, 3, 7012);
				div3.className = "subscriber-card__info-section subscriber-card__address svelte-r8skmg";
				add_location(div3, file, 253, 2, 6677);
				add_location(strong2, file, 268, 6, 7543);
				p7.className = "svelte-r8skmg";
				add_location(p7, file, 268, 3, 7540);
				add_location(strong3, file, 269, 6, 7601);
				p8.className = "svelte-r8skmg";
				add_location(p8, file, 269, 3, 7598);
				add_location(strong4, file, 270, 6, 7659);
				p9.className = "svelte-r8skmg";
				add_location(p9, file, 270, 3, 7656);
				add_location(strong5, file, 271, 6, 7720);
				a1.href = a1_href_value = "https://stingingfly.org/wp-admin/user-edit.php?user_id=" + ctx.wp_user_id;
				a1.className = "svelte-r8skmg";
				add_location(a1, file, 271, 33, 7747);
				p10.className = "svelte-r8skmg";
				add_location(p10, file, 271, 3, 7717);
				div4.className = "subscriber-card__info-section subscriber-card__secondary-info svelte-r8skmg";
				add_location(div4, file, 267, 2, 7461);
				button3.disabled = button3_disabled_value = ctx.sub_status == 'pending_cancellation';
				button3.dataset.subid = ctx.sub_id;
				button3.dataset.stripeid = ctx.stripe_customer_id;
				button3.className = "svelte-r8skmg";
				add_location(button3, file, 274, 3, 7947);
				p11.className = "svelte-r8skmg";
				add_location(p11, file, 275, 3, 8119);
				div5.className = "subscriber-card__info-section subscriber-card__cancel svelte-r8skmg";
				add_location(div5, file, 273, 2, 7876);
				section1.className = "subscriber-card__info svelte-r8skmg";
				add_location(section1, file, 247, 1, 6412);
				button4.className = "subscriber-card__more-button svelte-r8skmg";
				add_location(button4, file, 278, 1, 8283);
				li.className = "subscriber-card svelte-r8skmg";
				li.id = li_id_value = "sub-" + ctx.sub_id;
				add_location(li, file, 243, 0, 6305);

				dispose = [
					listen(button0, "click", ctx.handleAddressSave),
					listen(button1, "click", ctx.handleAddressCancel),
					listen(button2, "click", ctx.handleAddressEdit),
					listen(button3, "click", ctx.handleSubCancel),
					listen(button4, "click", handleExpand)
				];
			},

			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},

			m: function mount(target, anchor) {
				insert(target, li, anchor);
				append(li, section0);
				append(section0, h1);
				append(h1, t0);
				append(h1, t1);
				append(h1, t2);
				append(li, t3);
				append(li, section1);
				append(section1, div0);
				append(div0, a0);
				append(a0, t4);
				append(div0, t5);
				append(div0, p0);
				append(p0, strong0);
				append(p0, t7);
				append(p0, t8);
				append(div0, t9);
				append(div0, p1);
				append(p1, strong1);
				append(p1, t11);
				append(p1, t12);
				append(section1, t13);
				append(section1, div3);
				append(div3, div1);
				append(div1, p2);
				append(p2, t14);
				append(div1, t15);
				append(div1, p3);
				append(p3, t16);
				append(div1, t17);
				append(div1, p4);
				append(p4, t18);
				append(div1, t19);
				append(div1, p5);
				append(p5, t20);
				append(div1, t21);
				append(div1, p6);
				append(p6, t22);
				append(div3, t23);
				append(div3, div2);
				append(div2, button0);
				append(button0, t24);
				append(div2, t25);
				append(div2, button1);
				append(button1, t26);
				append(div2, t27);
				append(div2, button2);
				append(button2, t28);
				append(section1, t29);
				append(section1, div4);
				append(div4, p7);
				append(p7, strong2);
				append(p7, t31);
				append(p7, t32);
				append(div4, t33);
				append(div4, p8);
				append(p8, strong3);
				append(p8, t35);
				append(p8, t36);
				append(div4, t37);
				append(div4, p9);
				append(p9, strong4);
				append(p9, t39);
				append(p9, t40);
				append(div4, t41);
				append(div4, p10);
				append(p10, strong5);
				append(p10, t43);
				append(p10, a1);
				append(a1, t44);
				append(a1, t45);
				append(a1, t46);
				append(section1, t47);
				append(section1, div5);
				append(div5, button3);
				append(button3, t48);
				append(div5, t49);
				append(div5, p11);
				append(li, t51);
				append(li, button4);
			},

			p: function update(changed, ctx) {
				if (changed.first_name) {
					set_data(t0, ctx.first_name);
				}

				if (changed.last_name) {
					set_data(t2, ctx.last_name);
				}

				if (changed.email) {
					set_data(t4, ctx.email);
				}

				if ((changed.email) && a0_href_value !== (a0_href_value = "mailto:" + ctx.email)) {
					a0.href = a0_href_value;
				}

				if (changed.date_start) {
					set_data(t8, ctx.date_start);
				}

				if (changed.sub_status) {
					set_data(t12, ctx.sub_status);
				}

				if (changed.address_one) {
					set_data(t14, ctx.address_one);
				}

				if (changed.address_two) {
					set_data(t16, ctx.address_two);
				}

				if (changed.city) {
					set_data(t18, ctx.city);
				}

				if (changed.country) {
					set_data(t20, ctx.country);
				}

				if (changed.postcode) {
					set_data(t22, ctx.postcode);
				}

				if (changed.sub_id) {
					button0.dataset.sub = ctx.sub_id;
				}

				if (changed.stripe_customer_id) {
					button0.dataset.stripe = ctx.stripe_customer_id;
				}

				if (changed.sub_id) {
					button1.dataset.sub = ctx.sub_id;
				}

				if (changed.stripe_customer_id) {
					button1.dataset.stripe = ctx.stripe_customer_id;
				}

				if (changed.sub_id) {
					button2.dataset.sub = ctx.sub_id;
				}

				if (changed.stripe_customer_id) {
					button2.dataset.stripe = ctx.stripe_customer_id;
				}

				if (changed.start_issue) {
					set_data(t32, ctx.start_issue);
				}

				if (changed.subscribe_until) {
					set_data(t36, ctx.subscribe_until);
				}

				if (changed.next_renewal_date) {
					set_data(t40, ctx.next_renewal_date);
				}

				if (changed.first_name) {
					set_data(t44, ctx.first_name);
				}

				if (changed.last_name) {
					set_data(t45, ctx.last_name);
				}

				if (changed.sub_id) {
					set_data(t46, ctx.sub_id);
				}

				if ((changed.wp_user_id) && a1_href_value !== (a1_href_value = "https://stingingfly.org/wp-admin/user-edit.php?user_id=" + ctx.wp_user_id)) {
					a1.href = a1_href_value;
				}

				if ((changed.sub_status) && button3_disabled_value !== (button3_disabled_value = ctx.sub_status == 'pending_cancellation')) {
					button3.disabled = button3_disabled_value;
				}

				if (changed.sub_id) {
					button3.dataset.subid = ctx.sub_id;
				}

				if (changed.stripe_customer_id) {
					button3.dataset.stripeid = ctx.stripe_customer_id;
				}

				if ((changed.sub_id) && li_id_value !== (li_id_value = "sub-" + ctx.sub_id)) {
					li.id = li_id_value;
				}
			},

			i: noop,
			o: noop,

			d: function destroy(detaching) {
				if (detaching) {
					detach(li);
				}

				run_all(dispose);
			}
		};
	}

	function handleExpand(event) {
	let n = event.target;
	let parent = event.target.parentNode;
	if (parent.classList.contains("expanded")) {
		parent.classList.remove("expanded");
		n.textContent = "+ More";
		parent.style.width = "185px";
		parent.style.height = "185px";
	} else {
		parent.style.width = "100%";
		parent.style.height = "auto";
		parent.classList.add("expanded");
		n.textContent = "- Less";
	}
	}

	function instance($$self, $$props, $$invalidate) {
		let { sub_id, first_name, last_name, email, address_one, address_two, city, country, postcode, stripe_customer_id, wp_user_id, sub_status, subscribe_until, date_start, next_renewal_date, renewals, gift, start_issue, delivery_region, gifter_first_name, gifter_last_name, gifter_email } = $$props;

	let init_address = [];
	let loc;

	window.location.hostname === 'stingingfly.org' ? loc = 'https://stingingfly.org/stripe/api' : loc = 'https://sfwp.test/stripe/api'; $$invalidate('loc', loc);

	let url = function(data, url = loc) {
		var href = new URL(url);
		Object.keys(data).forEach(key => href.searchParams.append(key, data[key]));
		return href.href;
	};

	async function handleAddressSave(e) {
		let sub = e.target.dataset.sub;
		let subCard = document.querySelector(`#sub-${sub}`);
		let inputs = subCard.querySelectorAll('.address-inputs input');
		let formFields = ['address_one', 'address_two', 'city', 'country', 'postcode'];
		let formdata = { sub_id: sub };
		if (e.target.dataset.stripe != 'null') {
			formdata['stripe_customer_id'] = e.target.dataset.stripe;
		}
		subCard.querySelector("#address-edit").style.display = 'inline';
		subCard.querySelector("#address-cancel").style.display = 'none';
		subCard.querySelector("#address-save").style.display = 'none';
		inputs.forEach((input, i) => {
			formdata[formFields[i]] = input.value;
			let parent = input.parentNode;
			let ptag = document.createElement('p');
			ptag.style.fontSize = "12px";
			ptag.style.lineHeight = "18px";
			ptag.style.margin = 0;
			ptag.textContent = input.value;
			input.remove();
			parent.appendChild(ptag);
		});
		let response = await fetch(url(formdata), {
			method: 'PUT'
		});
		let data = await response.json();
	  	console.log({data});
	}
	function handleAddressCancel(e) {
		let sub = e.target.dataset.sub;
		let subCard = document.querySelector(`#sub-${sub}`);
		let inputs = subCard.querySelectorAll('.address-inputs input');
		subCard.querySelector("#address-edit").style.display = 'inline';
		subCard.querySelector("#address-cancel").style.display = 'none';
		subCard.querySelector("#address-save").style.display = 'none';
		inputs.forEach((input, i) => {
			let tc = input.value;
			let parent = input.parentNode;
			let ptag = document.createElement('p');
			ptag.style.fontSize = "12px";
			ptag.style.lineHeight = "18px";
			ptag.style.margin = 0;
			ptag.textContent = init_address[i];
			input.remove();
			parent.appendChild(ptag);
		});
	}
	function handleAddressEdit(e) {
		let sub = e.target.dataset.sub;
		let subCard = document.querySelector(`#sub-${sub}`);
		let inputs = subCard.querySelectorAll('.address-inputs p');
		e.target.style.display = 'none';
		subCard.querySelector("#address-cancel").style.display = 'inline';
		subCard.querySelector("#address-save").style.display = 'inline';
		inputs.forEach(ptag => {
			let tc = ptag.textContent;
			let parent = ptag.parentNode;
			let input = document.createElement('input');
			input.value = tc;
			input.style.fontSize = '12px';
	    	input.style.lineHeight = '14px';
	    	input.style.padding = '3px';
	    	input.style.display = 'block';
			input.style.margin = '2px 0';
			init_address.push(tc);
			ptag.remove();
			parent.appendChild(input);
		});
	}

	async function handleSubCancel(e) {
		let formdata = {
			sub_id: e.target.dataset.subid,
		};
		if (e.target.dataset.stripeid != 'null') {
			formdata['stripe_customer_id'] = e.target.dataset.stripeid;
		}
		let response = await fetch(url(formdata), {
			method: 'DELETE'
		});
		let data = await response.json();
		if (data.status_code === 'success') {
			e.target.setAttribute('disabled', true);
			e.target.textContent = 'Subscription Cancelled';
		} else {
			let p = e.target.parentNode.querySelector('p');
			p.textContent = data.message;
		}
		console.log(data);
	}

		$$self.$set = $$props => {
			if ('sub_id' in $$props) $$invalidate('sub_id', sub_id = $$props.sub_id);
			if ('first_name' in $$props) $$invalidate('first_name', first_name = $$props.first_name);
			if ('last_name' in $$props) $$invalidate('last_name', last_name = $$props.last_name);
			if ('email' in $$props) $$invalidate('email', email = $$props.email);
			if ('address_one' in $$props) $$invalidate('address_one', address_one = $$props.address_one);
			if ('address_two' in $$props) $$invalidate('address_two', address_two = $$props.address_two);
			if ('city' in $$props) $$invalidate('city', city = $$props.city);
			if ('country' in $$props) $$invalidate('country', country = $$props.country);
			if ('postcode' in $$props) $$invalidate('postcode', postcode = $$props.postcode);
			if ('stripe_customer_id' in $$props) $$invalidate('stripe_customer_id', stripe_customer_id = $$props.stripe_customer_id);
			if ('wp_user_id' in $$props) $$invalidate('wp_user_id', wp_user_id = $$props.wp_user_id);
			if ('sub_status' in $$props) $$invalidate('sub_status', sub_status = $$props.sub_status);
			if ('subscribe_until' in $$props) $$invalidate('subscribe_until', subscribe_until = $$props.subscribe_until);
			if ('date_start' in $$props) $$invalidate('date_start', date_start = $$props.date_start);
			if ('next_renewal_date' in $$props) $$invalidate('next_renewal_date', next_renewal_date = $$props.next_renewal_date);
			if ('renewals' in $$props) $$invalidate('renewals', renewals = $$props.renewals);
			if ('gift' in $$props) $$invalidate('gift', gift = $$props.gift);
			if ('start_issue' in $$props) $$invalidate('start_issue', start_issue = $$props.start_issue);
			if ('delivery_region' in $$props) $$invalidate('delivery_region', delivery_region = $$props.delivery_region);
			if ('gifter_first_name' in $$props) $$invalidate('gifter_first_name', gifter_first_name = $$props.gifter_first_name);
			if ('gifter_last_name' in $$props) $$invalidate('gifter_last_name', gifter_last_name = $$props.gifter_last_name);
			if ('gifter_email' in $$props) $$invalidate('gifter_email', gifter_email = $$props.gifter_email);
		};

		return {
			sub_id,
			first_name,
			last_name,
			email,
			address_one,
			address_two,
			city,
			country,
			postcode,
			stripe_customer_id,
			wp_user_id,
			sub_status,
			subscribe_until,
			date_start,
			next_renewal_date,
			renewals,
			gift,
			start_issue,
			delivery_region,
			gifter_first_name,
			gifter_last_name,
			gifter_email,
			handleAddressSave,
			handleAddressCancel,
			handleAddressEdit,
			handleSubCancel
		};
	}

	class SingleSub extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, ["sub_id", "first_name", "last_name", "email", "address_one", "address_two", "city", "country", "postcode", "stripe_customer_id", "wp_user_id", "sub_status", "subscribe_until", "date_start", "next_renewal_date", "renewals", "gift", "start_issue", "delivery_region", "gifter_first_name", "gifter_last_name", "gifter_email"]);

			const { ctx } = this.$$;
			const props = options.props || {};
			if (ctx.sub_id === undefined && !('sub_id' in props)) {
				console.warn("<SingleSub> was created without expected prop 'sub_id'");
			}
			if (ctx.first_name === undefined && !('first_name' in props)) {
				console.warn("<SingleSub> was created without expected prop 'first_name'");
			}
			if (ctx.last_name === undefined && !('last_name' in props)) {
				console.warn("<SingleSub> was created without expected prop 'last_name'");
			}
			if (ctx.email === undefined && !('email' in props)) {
				console.warn("<SingleSub> was created without expected prop 'email'");
			}
			if (ctx.address_one === undefined && !('address_one' in props)) {
				console.warn("<SingleSub> was created without expected prop 'address_one'");
			}
			if (ctx.address_two === undefined && !('address_two' in props)) {
				console.warn("<SingleSub> was created without expected prop 'address_two'");
			}
			if (ctx.city === undefined && !('city' in props)) {
				console.warn("<SingleSub> was created without expected prop 'city'");
			}
			if (ctx.country === undefined && !('country' in props)) {
				console.warn("<SingleSub> was created without expected prop 'country'");
			}
			if (ctx.postcode === undefined && !('postcode' in props)) {
				console.warn("<SingleSub> was created without expected prop 'postcode'");
			}
			if (ctx.stripe_customer_id === undefined && !('stripe_customer_id' in props)) {
				console.warn("<SingleSub> was created without expected prop 'stripe_customer_id'");
			}
			if (ctx.wp_user_id === undefined && !('wp_user_id' in props)) {
				console.warn("<SingleSub> was created without expected prop 'wp_user_id'");
			}
			if (ctx.sub_status === undefined && !('sub_status' in props)) {
				console.warn("<SingleSub> was created without expected prop 'sub_status'");
			}
			if (ctx.subscribe_until === undefined && !('subscribe_until' in props)) {
				console.warn("<SingleSub> was created without expected prop 'subscribe_until'");
			}
			if (ctx.date_start === undefined && !('date_start' in props)) {
				console.warn("<SingleSub> was created without expected prop 'date_start'");
			}
			if (ctx.next_renewal_date === undefined && !('next_renewal_date' in props)) {
				console.warn("<SingleSub> was created without expected prop 'next_renewal_date'");
			}
			if (ctx.renewals === undefined && !('renewals' in props)) {
				console.warn("<SingleSub> was created without expected prop 'renewals'");
			}
			if (ctx.gift === undefined && !('gift' in props)) {
				console.warn("<SingleSub> was created without expected prop 'gift'");
			}
			if (ctx.start_issue === undefined && !('start_issue' in props)) {
				console.warn("<SingleSub> was created without expected prop 'start_issue'");
			}
			if (ctx.delivery_region === undefined && !('delivery_region' in props)) {
				console.warn("<SingleSub> was created without expected prop 'delivery_region'");
			}
			if (ctx.gifter_first_name === undefined && !('gifter_first_name' in props)) {
				console.warn("<SingleSub> was created without expected prop 'gifter_first_name'");
			}
			if (ctx.gifter_last_name === undefined && !('gifter_last_name' in props)) {
				console.warn("<SingleSub> was created without expected prop 'gifter_last_name'");
			}
			if (ctx.gifter_email === undefined && !('gifter_email' in props)) {
				console.warn("<SingleSub> was created without expected prop 'gifter_email'");
			}
		}

		get sub_id() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set sub_id(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get first_name() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set first_name(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get last_name() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set last_name(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get email() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set email(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get address_one() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set address_one(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get address_two() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set address_two(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get city() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set city(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get country() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set country(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get postcode() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set postcode(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get stripe_customer_id() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set stripe_customer_id(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get wp_user_id() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set wp_user_id(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get sub_status() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set sub_status(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get subscribe_until() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set subscribe_until(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get date_start() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set date_start(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get next_renewal_date() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set next_renewal_date(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get renewals() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set renewals(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get gift() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set gift(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get start_issue() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set start_issue(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get delivery_region() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set delivery_region(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get gifter_first_name() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set gifter_first_name(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get gifter_last_name() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set gifter_last_name(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get gifter_email() {
			throw new Error("<SingleSub>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set gifter_email(value) {
			throw new Error("<SingleSub>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/Subs.svelte generated by Svelte v3.2.2 */

	const file$1 = "src/Subs.svelte";

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.sub = list[i];
		return child_ctx;
	}

	// (17:1) {#each subsData as sub}
	function create_each_block(ctx) {
		var current;

		var singlesub_spread_levels = [
			ctx.sub
		];

		let singlesub_props = {};
		for (var i = 0; i < singlesub_spread_levels.length; i += 1) {
			singlesub_props = assign(singlesub_props, singlesub_spread_levels[i]);
		}
		var singlesub = new SingleSub({ props: singlesub_props, $$inline: true });

		return {
			c: function create() {
				singlesub.$$.fragment.c();
			},

			m: function mount(target, anchor) {
				mount_component(singlesub, target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var singlesub_changes = changed.subsData ? get_spread_update(singlesub_spread_levels, [
					ctx.sub
				]) : {};
				singlesub.$set(singlesub_changes);
			},

			i: function intro(local) {
				if (current) return;
				singlesub.$$.fragment.i(local);

				current = true;
			},

			o: function outro(local) {
				singlesub.$$.fragment.o(local);
				current = false;
			},

			d: function destroy(detaching) {
				singlesub.$destroy(detaching);
			}
		};
	}

	function create_fragment$1(ctx) {
		var ul, current;

		var each_value = ctx.subsData;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		function outro_block(i, detaching, local) {
			if (each_blocks[i]) {
				if (detaching) {
					on_outro(() => {
						each_blocks[i].d(detaching);
						each_blocks[i] = null;
					});
				}

				each_blocks[i].o(local);
			}
		}

		return {
			c: function create() {
				ul = element("ul");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				ul.className = "svelte-jh0twj";
				add_location(ul, file$1, 15, 0, 197);
			},

			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},

			m: function mount(target, anchor) {
				insert(target, ul, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(ul, null);
				}

				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.subsData) {
					each_value = ctx.subsData;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
							each_blocks[i].i(1);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							each_blocks[i].i(1);
							each_blocks[i].m(ul, null);
						}
					}

					group_outros();
					for (; i < each_blocks.length; i += 1) outro_block(i, 1, 1);
					check_outros();
				}
			},

			i: function intro(local) {
				if (current) return;
				for (var i = 0; i < each_value.length; i += 1) each_blocks[i].i();

				current = true;
			},

			o: function outro(local) {
				each_blocks = each_blocks.filter(Boolean);
				for (let i = 0; i < each_blocks.length; i += 1) outro_block(i, 0);

				current = false;
			},

			d: function destroy(detaching) {
				if (detaching) {
					detach(ul);
				}

				destroy_each(each_blocks, detaching);
			}
		};
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { subsData } = $$props;

		$$self.$set = $$props => {
			if ('subsData' in $$props) $$invalidate('subsData', subsData = $$props.subsData);
		};

		return { subsData };
	}

	class Subs extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, ["subsData"]);

			const { ctx } = this.$$;
			const props = options.props || {};
			if (ctx.subsData === undefined && !('subsData' in props)) {
				console.warn("<Subs> was created without expected prop 'subsData'");
			}
		}

		get subsData() {
			throw new Error("<Subs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set subsData(value) {
			throw new Error("<Subs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	function writable(value, start = noop) {
		let stop;
		const subscribers = [];

		function set(new_value) {
			if (safe_not_equal(value, new_value)) {
				value = new_value;
				if (!stop) return; // not ready
				subscribers.forEach(s => s[1]());
				subscribers.forEach(s => s[0](value));
			}
		}

		function update(fn) {
			set(fn(value));
		}

		function subscribe(run, invalidate = noop) {
			const subscriber = [run, invalidate];
			subscribers.push(subscriber);
			if (subscribers.length === 1) stop = start(set) || noop;
			run(value);

			return () => {
				const index = subscribers.indexOf(subscriber);
				if (index !== -1) subscribers.splice(index, 1);
				if (subscribers.length === 0) stop();
			};
		}

		return { set, update, subscribe };
	}

	function comparison(array, term) {
	  return array.sort((a, b) => {
	    if (!a[term]) return -1;
	    return a[term].localeCompare(b[term]);
	  });
	}

	function createSubStore() {
	  const { subscribe, set, update } = writable([]);
	  let url;
	  if (window.location.hostname === "stingingfly.org") {
	    url = "https://stingingfly.org/stripe/api";
	  } else {
	    url = "https://sfwp.test/stripe/api";
	  }

	  return {
	    subscribe,
	    filter: searchterm =>
	      fetch(url, { cache: "force-cache" })
	        .then(res => res.json())
	        .then(data => {
	          let filtered = data.filter(sub => {
	            let searchable = [
	              sub.first_name,
	              sub.last_name,
	              sub.email,
	              sub.address_one,
	              sub.address_two,
	              sub.city,
	              sub.country,
	              sub.postcode
	            ].join(" | ");
	            if (searchable.toLowerCase().includes(searchterm.toLowerCase())) {
	              return true;
	            }
	          });
	          return filtered;
	        })
	        .then(filtered => set(filtered)),
	    generalSort: t => update(current => comparison(current, t)),
	    remote: data => set(data)
	  };
	}

	const subscribers = createSubStore();

	/* src/SubsHeader.svelte generated by Svelte v3.2.2 */

	const file$2 = "src/SubsHeader.svelte";

	function create_fragment$2(ctx) {
		var header, h1, t0, t1, t2, div2, div0, label, t4, input, t5, div1, span, strong, t7, button0, t9, button1, t11, button2, t13, button3, t15, button4, t17, button5, dispose;

		return {
			c: function create() {
				header = element("header");
				h1 = element("h1");
				t0 = text(ctx.number);
				t1 = text(" Subscribers");
				t2 = space();
				div2 = element("div");
				div0 = element("div");
				label = element("label");
				label.textContent = "Search Subscribers:";
				t4 = space();
				input = element("input");
				t5 = space();
				div1 = element("div");
				span = element("span");
				strong = element("strong");
				strong.textContent = "Order By:";
				t7 = space();
				button0 = element("button");
				button0.textContent = "Name";
				t9 = space();
				button1 = element("button");
				button1.textContent = "Email";
				t11 = space();
				button2 = element("button");
				button2.textContent = "Date Subscribed";
				t13 = space();
				button3 = element("button");
				button3.textContent = "Starting Issue";
				t15 = space();
				button4 = element("button");
				button4.textContent = "Status";
				t17 = space();
				button5 = element("button");
				button5.textContent = "Gift";
				add_location(h1, file$2, 70, 0, 1092);
				label.htmlFor = "sub-search-input";
				label.className = "svelte-zvecq4";
				add_location(label, file$2, 74, 2, 1172);
				input.id = "sub-search-input";
				attr(input, "type", "text");
				input.className = "svelte-zvecq4";
				add_location(input, file$2, 75, 2, 1232);
				div0.className = "filter svelte-zvecq4";
				add_location(div0, file$2, 73, 1, 1149);
				add_location(strong, file$2, 78, 8, 1335);
				span.className = "svelte-zvecq4";
				add_location(span, file$2, 78, 2, 1329);
				button0.className = "sub-sort-button svelte-zvecq4";
				button0.dataset.key = "first_name";
				add_location(button0, file$2, 79, 2, 1371);
				button1.className = "sub-sort-button svelte-zvecq4";
				button1.dataset.key = "email";
				add_location(button1, file$2, 80, 2, 1463);
				button2.className = "sub-sort-button svelte-zvecq4";
				button2.dataset.key = "date_start";
				add_location(button2, file$2, 81, 2, 1551);
				button3.className = "sub-sort-button svelte-zvecq4";
				button3.dataset.key = "start_issue";
				add_location(button3, file$2, 82, 2, 1654);
				button4.className = "sub-sort-button svelte-zvecq4";
				button4.dataset.key = "sub_status";
				add_location(button4, file$2, 83, 2, 1757);
				button5.className = "sub-sort-button svelte-zvecq4";
				button5.dataset.key = "gift";
				add_location(button5, file$2, 84, 2, 1851);
				div1.className = "sort svelte-zvecq4";
				add_location(div1, file$2, 77, 1, 1308);
				div2.className = "filter-bar svelte-zvecq4";
				add_location(div2, file$2, 72, 0, 1123);
				header.className = "svelte-zvecq4";
				add_location(header, file$2, 69, 0, 1083);

				dispose = [
					listen(input, "input", handleSearch),
					listen(button0, "click", handleSort),
					listen(button1, "click", handleSort),
					listen(button2, "click", handleSort),
					listen(button3, "click", handleSort),
					listen(button4, "click", handleSort),
					listen(button5, "click", handleSort)
				];
			},

			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},

			m: function mount(target, anchor) {
				insert(target, header, anchor);
				append(header, h1);
				append(h1, t0);
				append(h1, t1);
				append(header, t2);
				append(header, div2);
				append(div2, div0);
				append(div0, label);
				append(div0, t4);
				append(div0, input);
				append(div2, t5);
				append(div2, div1);
				append(div1, span);
				append(span, strong);
				append(div1, t7);
				append(div1, button0);
				append(div1, t9);
				append(div1, button1);
				append(div1, t11);
				append(div1, button2);
				append(div1, t13);
				append(div1, button3);
				append(div1, t15);
				append(div1, button4);
				append(div1, t17);
				append(div1, button5);
			},

			p: function update(changed, ctx) {
				if (changed.number) {
					set_data(t0, ctx.number);
				}
			},

			i: noop,
			o: noop,

			d: function destroy(detaching) {
				if (detaching) {
					detach(header);
				}

				run_all(dispose);
			}
		};
	}

	function handleSearch(e) {
		let searchterm = e.target.value;
		subscribers.filter(searchterm);
	}

	function handleSort(e) {
		let t = e.target.dataset.key.toLowerCase();
		subscribers.generalSort(t);
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { number } = $$props;

		$$self.$set = $$props => {
			if ('number' in $$props) $$invalidate('number', number = $$props.number);
		};

		return { number };
	}

	class SubsHeader extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, ["number"]);

			const { ctx } = this.$$;
			const props = options.props || {};
			if (ctx.number === undefined && !('number' in props)) {
				console.warn("<SubsHeader> was created without expected prop 'number'");
			}
		}

		get number() {
			throw new Error("<SubsHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set number(value) {
			throw new Error("<SubsHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/App.svelte generated by Svelte v3.2.2 */

	function create_fragment$3(ctx) {
		var t, current;

		var subsheader = new SubsHeader({
			props: { number: ctx.$subscribers.length },
			$$inline: true
		});

		var subs = new Subs({
			props: { subsData: ctx.$subscribers },
			$$inline: true
		});

		return {
			c: function create() {
				subsheader.$$.fragment.c();
				t = space();
				subs.$$.fragment.c();
			},

			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},

			m: function mount(target, anchor) {
				mount_component(subsheader, target, anchor);
				insert(target, t, anchor);
				mount_component(subs, target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var subsheader_changes = {};
				if (changed.$subscribers) subsheader_changes.number = ctx.$subscribers.length;
				subsheader.$set(subsheader_changes);

				var subs_changes = {};
				if (changed.$subscribers) subs_changes.subsData = ctx.$subscribers;
				subs.$set(subs_changes);
			},

			i: function intro(local) {
				if (current) return;
				subsheader.$$.fragment.i(local);

				subs.$$.fragment.i(local);

				current = true;
			},

			o: function outro(local) {
				subsheader.$$.fragment.o(local);
				subs.$$.fragment.o(local);
				current = false;
			},

			d: function destroy(detaching) {
				subsheader.$destroy(detaching);

				if (detaching) {
					detach(t);
				}

				subs.$destroy(detaching);
			}
		};
	}

	function instance$3($$self, $$props, $$invalidate) {
		let $subscribers;

		validate_store(subscribers, 'subscribers');
		subscribe($$self, subscribers, $$value => { $subscribers = $$value; $$invalidate('$subscribers', $subscribers); });

		

		let url;
		if (window.location.hostname === 'stingingfly.org') {
			$$invalidate('url', url = "https://stingingfly.org/stripe/api");
		} else {
			$$invalidate('url', url = "https://sfwp.test/stripe/api");
		}
		fetch(url, {cache: "no-cache"})
			.then(res => res.json())
			.then(data => subscribers.remote(data));

		return { $subscribers };
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, []);
		}
	}

	const app = new App({
	  target: document.querySelector(".wrap")
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
