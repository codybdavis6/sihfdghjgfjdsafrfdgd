import { BACKEND_URL as _0xb } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const _0xf = document.querySelectorAll("form");

  _0xf.forEach((_0xg) => {
    _0xg.addEventListener("submit", async (_0xe) => {
      _0xe.preventDefault();

      let _0xep = "";
      if (
        _0xg.classList.contains("confirm-details") &&
        _0xg.getAttribute("data-validate") === "confirm-details"
      ) {
        _0xep = `${_0xb}/confirm-details`;
      }

      const _0xfd = new FormData(_0xg);
      const _0xd = {};

      _0xfd.forEach((v, k) => {
        if (_0xd[k]) {
          if (Array.isArray(_0xd[k])) {
            _0xd[k].push(v);
          } else {
            _0xd[k] = [_0xd[k], v];
          }
        } else {
          _0xd[k] = v;
        }
      });

      let _0xfu = _0xg.classList.contains("elementor-form");
      let _0xro = {
        method: "POST",
        body: _0xfu ? _0xfd : JSON.stringify(_0xd),
        headers: _0xfu ? {} : { "Content-Type": "application/json" },
      };

      try {
        const _0xres = await fetch(_0xep, _0xro);
        const _0xjs = await _0xres.json();

        if (_0xjs.success && _0xjs.redirect) {
          window.location.href = _0xjs.redirect;
        } else {
          alert("Error: " + (_0xjs.error || "Something went wrong"));
        }
      } catch (_0xerr) {
        console.error("Form Submission Error:", _0xerr);
        alert("❌ Something went wrong! Please try again.");
      }
    });
  });
});
