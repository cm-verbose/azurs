(() => {
  "use strict";
  var t = [
      function (t, n, e) {
        var i =
          (this && this.t) ||
          function (t) {
            return t && t.i ? t : { default: t };
          };
        Object.defineProperty(n, "i", { value: !0 });
        var r = i(e(1));
        new ((function () {
          function t() {
            this.o();
          }
          return (
            (t.prototype.o = function () {
              new r.default();
            }),
            t
          );
        })())();
      },
      (t, n) => {
        Object.defineProperty(n, "i", { value: !0 });
        var e = (function () {
          function t() {
            (this.u = document.querySelector("#editor")),
              (this.h = document.querySelector("#initial-paragraph")),
              this.v();
          }
          return (
            (t.prototype.v = function () {
              var t = this;
              this.u.addEventListener("beforeinput", function (n) {
                switch (n.inputType) {
                  case "deleteContentBackward":
                    t.l(n);
                    break;
                  case "insertParagraph":
                    t.p(n);
                }
              });
            }),
            (t.prototype.l = function (t) {
              var n = t.getTargetRanges();
              if (1 === n.length) this.m(t, n[0]);
              else
                for (var e = 0, i = n; e < i.length; e++) {
                  var r = i[e];
                  console.info("[Backwards deletion]:", r);
                }
            }),
            (t.prototype.m = function (t, n) {
              var e = this,
                i = this.k(n.startContainer),
                r = this.k(n.endContainer),
                a = this.k(i).isSameNode(this.h),
                o = n.startOffset;
              if (i.isEqualNode(r)) {
                var s = n.endOffset - o,
                  u = this.h.innerText;
                a &&
                  u.length === s &&
                  (t.preventDefault(), (this.h.innerHTML = ""), this.h.removeAttribute("data-empty"));
              } else
                a &&
                  0 === o &&
                  setTimeout(function () {
                    (e.h.innerHTML = ""),
                      1 !== e.u.childElementCount
                        ? e.h.setAttribute("data-empty", "")
                        : e.h.removeAttribute("data-empty");
                  });
            }),
            (t.prototype.p = function (t) {
              var n = t.getTargetRanges();
              if (1 === n.length) this._(t, n[0]);
              else
                for (var e = 0, i = n; e < i.length; e++) {
                  var r = i[e];
                  console.info("[Paragraph Insertion]", r);
                }
            }),
            (t.prototype._ = function (t, n) {
              t.preventDefault();
              var e = window.getSelection();
              if (e) {
                var i = n.startContainer,
                  r = new Range();
                r.setStart(i, n.startOffset), r.setEnd(n.endContainer, n.endOffset), r.deleteContents();
                var a = document.createElement("p"),
                  o = this.k(i),
                  s = new Range();
                if (null === o.lastChild) {
                  var u = document.createElement("br");
                  a.appendChild(u);
                } else {
                  s.setStart(i, n.startOffset), s.setEndAfter(o.lastChild);
                  var c = s.extractContents();
                  if (null === c.textContent || 0 === c.textContent.length) {
                    u = document.createElement("br");
                    a.appendChild(u);
                  } else
                    c.childNodes.forEach(function (t) {
                      a.appendChild(t);
                    });
                }
                o.insertAdjacentElement("afterend", a),
                  s.setStartBefore(a),
                  s.setEndBefore(a),
                  e.removeAllRanges(),
                  e.addRange(s),
                  a.scrollIntoView({ behavior: "instant", j: "center" }),
                  this.u.childElementCount > 1 && this.h.setAttribute("data-empty", "");
              }
            }),
            (t.prototype.k = function (t) {
              for (var n = t; null !== n.parentNode && !n.parentNode.isEqualNode(this.u); ) n = n.parentNode;
              return n;
            }),
            t
          );
        })();
        n.default = e;
      },
    ],
    n = {};
  (function e(i) {
    var r = n[i];
    if (void 0 !== r) return r.exports;
    var a = (n[i] = { exports: {} });
    return t[i].call(a.exports, a, a.exports, e), a.exports;
  })(0);
})();
