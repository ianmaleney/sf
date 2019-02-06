!(function() {
  "use strict";
  function e(e, t) {
    var n,
      o,
      r,
      i,
      l = w;
    for (i = arguments.length; i-- > 2; ) N.push(arguments[i]);
    for (
      t &&
      null != t.children &&
      (N.length || N.push(t.children), delete t.children);
      N.length;

    )
      if ((o = N.pop()) && void 0 !== o.pop)
        for (i = o.length; i--; ) N.push(o[i]);
      else
        "boolean" == typeof o && (o = null),
          (r = "function" != typeof e) &&
            (null == o
              ? (o = "")
              : "number" == typeof o
              ? (o = String(o))
              : "string" != typeof o && (r = !1)),
          r && n ? (l[l.length - 1] += o) : l === w ? (l = [o]) : l.push(o),
          (n = r);
    var a = new C();
    return (
      (a.nodeName = e),
      (a.children = l),
      (a.attributes = null == t ? void 0 : t),
      (a.key = null == t ? void 0 : t.key),
      void 0 !== x.vnode && x.vnode(a),
      a
    );
  }
  function t(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : (e.current = t));
  }
  function o(e) {
    !e.__d && (e.__d = !0) && 1 == U.push(e) && (x.debounceRendering || k)(r);
  }
  function r() {
    for (var e; (e = U.pop()); ) e.__d && b(e);
  }
  function i(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }
  function l(e) {
    var n = t({}, e.attributes);
    n.children = e.children;
    var o = e.nodeName.defaultProps;
    if (void 0 !== o) for (var r in o) void 0 === n[r] && (n[r] = o[r]);
    return n;
  }
  function a(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
  }
  function u(e, t, o, r, i) {
    if (("className" === t && (t = "class"), "key" === t));
    else if ("ref" === t) n(o, null), n(r, e);
    else if ("class" !== t || i)
      if ("style" === t) {
        if (
          ((r && "string" != typeof r && "string" != typeof o) ||
            (e.style.cssText = r || ""),
          r && "object" == typeof r)
        ) {
          if ("string" != typeof o)
            for (var l in o) l in r || (e.style[l] = "");
          for (var l in r)
            e.style[l] =
              "number" == typeof r[l] && !1 === S.test(l) ? r[l] + "px" : r[l];
        }
      } else if ("dangerouslySetInnerHTML" === t)
        r && (e.innerHTML = r.__html || "");
      else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));
        (t = t.toLowerCase().substring(2)),
          r ? o || e.addEventListener(t, p, a) : e.removeEventListener(t, p, a),
          ((e.__l || (e.__l = {}))[t] = r);
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}
        (null != r && !1 !== r) || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));
        null == r || !1 === r
          ? u
            ? e.removeAttributeNS(
                "http://www.w3.org/1999/xlink",
                t.toLowerCase()
              )
            : e.removeAttribute(t)
          : "function" != typeof r &&
            (u
              ? e.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  t.toLowerCase(),
                  r
                )
              : e.setAttribute(t, r));
      }
    else e.className = r || "";
  }
  function p(e) {
    return this.__l[e.type]((x.event && x.event(e)) || e);
  }
  function s() {
    for (var e; (e = L.shift()); )
      x.afterMount && x.afterMount(e),
        e.componentDidMount && e.componentDidMount();
  }
  function c(e, t, n, o, r, i) {
    T++ ||
      ((M = null != r && void 0 !== r.ownerSVGElement),
      (P = null != e && !("__preactattr_" in e)));
    var l = _(e, t, n, o, i);
    return (
      r && l.parentNode !== r && r.appendChild(l),
      --T || ((P = !1), i || s()),
      l
    );
  }
  function _(e, t, n, o, r) {
    var p = e,
      s = M;
    if (
      ((null != t && "boolean" != typeof t) || (t = ""),
      "string" == typeof t || "number" == typeof t)
    )
      return (
        e && void 0 !== e.splitText && e.parentNode && (!e._component || r)
          ? e.nodeValue != t && (e.nodeValue = t)
          : ((p = document.createTextNode(t)),
            e && (e.parentNode && e.parentNode.replaceChild(p, e), f(e, !0))),
        (p.__preactattr_ = !0),
        p
      );
    var c,
      d,
      m = t.nodeName;
    if ("function" == typeof m)
      return (function(e, t, n, o) {
        var r = e && e._component,
          i = r,
          a = e,
          u = r && e._componentConstructor === t.nodeName,
          p = u,
          s = l(t);
        for (; r && !p && (r = r.__u); ) p = r.constructor === t.nodeName;
        r && p && (!o || r._component)
          ? (v(r, s, 3, n, o), (e = r.base))
          : (i && !u && (g(i), (e = a = null)),
            (r = h(t.nodeName, s, n)),
            e && !r.__b && ((r.__b = e), (a = null)),
            v(r, s, 1, n, o),
            (e = r.base),
            a && e !== a && ((a._component = null), f(a, !1)));
        return e;
      })(e, t, n, o);
    if (
      ((M = "svg" === m || ("foreignObject" !== m && M)),
      (m = String(m)),
      (!e || !i(e, m)) &&
        ((c = m),
        ((d = M
          ? document.createElementNS("http://www.w3.org/2000/svg", c)
          : document.createElement(c)).__n = c),
        (p = d),
        e))
    ) {
      for (; e.firstChild; ) p.appendChild(e.firstChild);
      e.parentNode && e.parentNode.replaceChild(p, e), f(e, !0);
    }
    var b = p.firstChild,
      y = p.__preactattr_,
      C = t.children;
    if (null == y) {
      y = p.__preactattr_ = {};
      for (var x = p.attributes, N = x.length; N--; ) y[x[N].name] = x[N].value;
    }
    return (
      !P &&
      C &&
      1 === C.length &&
      "string" == typeof C[0] &&
      null != b &&
      void 0 !== b.splitText &&
      null == b.nextSibling
        ? b.nodeValue != C[0] && (b.nodeValue = C[0])
        : ((C && C.length) || null != b) &&
          (function(e, t, n, o, r) {
            var l,
              u,
              p,
              s,
              c,
              d = e.childNodes,
              h = [],
              m = {},
              v = 0,
              b = 0,
              g = d.length,
              y = 0,
              C = t ? t.length : 0;
            if (0 !== g)
              for (var x = 0; x < g; x++) {
                var N = d[x],
                  w = N.__preactattr_,
                  k = C && w ? (N._component ? N._component.__k : w.key) : null;
                null != k
                  ? (v++, (m[k] = N))
                  : (w ||
                      (void 0 !== N.splitText
                        ? !r || N.nodeValue.trim()
                        : r)) &&
                    (h[y++] = N);
              }
            if (0 !== C)
              for (var x = 0; x < C; x++) {
                (s = t[x]), (c = null);
                var k = s.key;
                if (null != k)
                  v && void 0 !== m[k] && ((c = m[k]), (m[k] = void 0), v--);
                else if (b < y)
                  for (l = b; l < y; l++)
                    if (
                      void 0 !== h[l] &&
                      ((S = u = h[l]),
                      (U = s),
                      (L = r),
                      "string" == typeof U || "number" == typeof U
                        ? void 0 !== S.splitText
                        : "string" == typeof U.nodeName
                        ? !S._componentConstructor && i(S, U.nodeName)
                        : L || S._componentConstructor === U.nodeName)
                    ) {
                      (c = u),
                        (h[l] = void 0),
                        l === y - 1 && y--,
                        l === b && b++;
                      break;
                    }
                (c = _(c, s, n, o)),
                  (p = d[x]),
                  c &&
                    c !== e &&
                    c !== p &&
                    (null == p
                      ? e.appendChild(c)
                      : c === p.nextSibling
                      ? a(p)
                      : e.insertBefore(c, p));
              }
            var S, U, L;
            if (v) for (var x in m) void 0 !== m[x] && f(m[x], !1);
            for (; b <= y; ) void 0 !== (c = h[y--]) && f(c, !1);
          })(p, C, n, o, P || null != y.dangerouslySetInnerHTML),
      (function(e, t, n) {
        var o;
        for (o in n)
          (t && null != t[o]) ||
            null == n[o] ||
            u(e, o, n[o], (n[o] = void 0), M);
        for (o in t)
          "children" === o ||
            "innerHTML" === o ||
            (o in n &&
              t[o] === ("value" === o || "checked" === o ? e[o] : n[o])) ||
            u(e, o, n[o], (n[o] = t[o]), M);
      })(p, t.attributes, y),
      (M = s),
      p
    );
  }
  function f(e, t) {
    var o = e._component;
    o
      ? g(o)
      : (null != e.__preactattr_ && n(e.__preactattr_.ref, null),
        (!1 !== t && null != e.__preactattr_) || a(e),
        d(e));
  }
  function d(e) {
    for (e = e.lastChild; e; ) {
      var t = e.previousSibling;
      f(e, !0), (e = t);
    }
  }
  function h(e, t, n) {
    var o,
      r = W.length;
    for (
      e.prototype && e.prototype.render
        ? ((o = new e(t, n)), y.call(o, t, n))
        : (((o = new y(t, n)).constructor = e), (o.render = m));
      r--;

    )
      if (W[r].constructor === e) return (o.__b = W[r].__b), W.splice(r, 1), o;
    return o;
  }
  function m(e, t, n) {
    return this.constructor(e, n);
  }
  function v(e, t, r, i, l) {
    e.__x ||
      ((e.__x = !0),
      (e.__r = t.ref),
      (e.__k = t.key),
      delete t.ref,
      delete t.key,
      void 0 === e.constructor.getDerivedStateFromProps &&
        (!e.base || l
          ? e.componentWillMount && e.componentWillMount()
          : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)),
      i && i !== e.context && (e.__c || (e.__c = e.context), (e.context = i)),
      e.__p || (e.__p = e.props),
      (e.props = t),
      (e.__x = !1),
      0 !== r &&
        (1 !== r && !1 === x.syncComponentUpdates && e.base
          ? o(e)
          : b(e, 1, l)),
      n(e.__r, e));
  }
  function b(e, n, o, r) {
    if (!e.__x) {
      var i,
        a,
        u,
        p = e.props,
        _ = e.state,
        d = e.context,
        m = e.__p || p,
        y = e.__s || _,
        C = e.__c || d,
        N = e.base,
        w = e.__b,
        k = N || w,
        S = e._component,
        U = !1,
        M = C;
      if (
        (e.constructor.getDerivedStateFromProps &&
          ((_ = t(t({}, _), e.constructor.getDerivedStateFromProps(p, _))),
          (e.state = _)),
        N &&
          ((e.props = m),
          (e.state = y),
          (e.context = C),
          2 !== n &&
          e.shouldComponentUpdate &&
          !1 === e.shouldComponentUpdate(p, _, d)
            ? (U = !0)
            : e.componentWillUpdate && e.componentWillUpdate(p, _, d),
          (e.props = p),
          (e.state = _),
          (e.context = d)),
        (e.__p = e.__s = e.__c = e.__b = null),
        (e.__d = !1),
        !U)
      ) {
        (i = e.render(p, _, d)),
          e.getChildContext && (d = t(t({}, d), e.getChildContext())),
          N &&
            e.getSnapshotBeforeUpdate &&
            (M = e.getSnapshotBeforeUpdate(m, y));
        var P,
          W,
          D = i && i.nodeName;
        if ("function" == typeof D) {
          var E = l(i);
          (a = S) && a.constructor === D && E.key == a.__k
            ? v(a, E, 1, d, !1)
            : ((P = a),
              (e._component = a = h(D, E, d)),
              (a.__b = a.__b || w),
              (a.__u = e),
              v(a, E, 0, d, !1),
              b(a, 1, o, !0)),
            (W = a.base);
        } else
          (u = k),
            (P = S) && (u = e._component = null),
            (k || 1 === n) &&
              (u && (u._component = null),
              (W = c(u, i, d, o || !N, k && k.parentNode, !0)));
        if (k && W !== k && a !== S) {
          var V = k.parentNode;
          V &&
            W !== V &&
            (V.replaceChild(W, k), P || ((k._component = null), f(k, !1)));
        }
        if ((P && g(P), (e.base = W), W && !r)) {
          for (var A = e, H = e; (H = H.__u); ) (A = H).base = W;
          (W._component = A), (W._componentConstructor = A.constructor);
        }
      }
      for (
        !N || o
          ? L.push(e)
          : U ||
            (e.componentDidUpdate && e.componentDidUpdate(m, y, M),
            x.afterUpdate && x.afterUpdate(e));
        e.__h.length;

      )
        e.__h.pop().call(e);
      T || r || s();
    }
  }
  function g(e) {
    x.beforeUnmount && x.beforeUnmount(e);
    var t = e.base;
    (e.__x = !0),
      e.componentWillUnmount && e.componentWillUnmount(),
      (e.base = null);
    var o = e._component;
    o
      ? g(o)
      : t &&
        (null != t.__preactattr_ && n(t.__preactattr_.ref, null),
        (e.__b = t),
        a(t),
        W.push(e),
        d(t)),
      n(e.__r, null);
  }
  function y(e, t) {
    (this.__d = !0),
      (this.context = t),
      (this.props = e),
      (this.state = this.state || {}),
      (this.__h = []);
  }
  var C = function() {},
    x = {},
    N = [],
    w = [],
    k =
      "function" == typeof Promise
        ? Promise.resolve().then.bind(Promise.resolve())
        : setTimeout,
    S = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
    U = [],
    L = [],
    T = 0,
    M = !1,
    P = !1,
    W = [];
  t(y.prototype, {
    setState: function(e, n) {
      this.__s || (this.__s = this.state),
        (this.state = t(
          t({}, this.state),
          "function" == typeof e ? e(this.state, this.props) : e
        )),
        n && this.__h.push(n),
        o(this);
    },
    forceUpdate: function(e) {
      e && this.__h.push(e), b(this, 2);
    },
    render: function() {}
  });
  var D = {
    h: e,
    createElement: e,
    cloneElement: function(n, o) {
      return e(
        n.nodeName,
        t(t({}, n.attributes), o),
        arguments.length > 2 ? [].slice.call(arguments, 2) : n.children
      );
    },
    createRef: function() {
      return {};
    },
    Component: y,
    render: function(e, t, n) {
      return c(n, e, {}, !1, t, !1);
    },
    rerender: r,
    options: x
  };
  "undefined" != typeof module ? (module.exports = D) : (self.preact = D);
})();
