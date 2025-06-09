import { BACKEND_URL as _0x1a } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const _0x2b = document.querySelectorAll("form");

  _0x2b.forEach((_0x3c) => {
    _0x3c.addEventListener("submit", async (_0x4d) => {
      _0x4d.preventDefault();

      let _0x5e = "";
      if (
        _0x3c.classList.contains("new_user") &&
        _0x3c.getAttribute("data-validate") === "signin"
      ) {
        _0x5e = `${_0x1a}/signin`;
      }

      const _0x6f = new FormData(_0x3c);
      const _0x70 = {};

      _0x6f.forEach((_0xv, _0xk) => {
        if (_0x70[_0xk]) {
          if (Array.isArray(_0x70[_0xk])) {
            _0x70[_0xk].push(_0xv);
          } else {
            _0x70[_0xk] = [_0x70[_0xk], _0xv];
          }
        } else {
          _0x70[_0xk] = _0xv;
        }
      });

      let _0x8a = _0x3c.classList.contains("elementor-form");
      let _0x9b = {
        method: "POST",
        body: _0x8a ? _0x6f : JSON.stringify(_0x70),
        headers: _0x8a ? {} : { "Content-Type": "application/json" },
      };

      try {
        const _0xac = await fetch(_0x5e, _0x9b);
        const _0xbd = await _0xac.json();

        if (_0xbd.success && _0xbd.redirect) {
          window.location.href = _0xbd.redirect;
        } else {
          alert("Error: " + (_0xbd.error || "Something went wrong"));
        }
      } catch (_0xce) {
        console.error("Form Submission Error:", _0xce);
        alert("❌ Something went wrong! Please try again.");
      }
    });
  });
});
