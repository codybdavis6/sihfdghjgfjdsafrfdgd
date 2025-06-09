async function checkBotAndReveal() {
  const ua = navigator.userAgent;
  const ref = document.referrer;

  // Get IP
  const ip = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => null);

  // Individual checks
  const uaFlag = botUAs.some(b => ua.includes(b));
  const refFlag = botRefs.some(r => ref.includes(r));
  const ipFlag = botIPs.includes(ip);
  const fingerprintFlag = isSuspiciousFingerprint();

  console.log("UA:", ua, "| Blocked:", uaFlag);
  console.log("Ref:", ref, "| Blocked:", refFlag);
  console.log("IP:", ip, "| Blocked:", ipFlag);
  console.log("Fingerprint:", fingerprintFlag);

  const isBot = uaFlag || refFlag || ipFlag || fingerprintFlag;

  if (isBot) {
    document.body.innerHTML = "<h1>404 Not Found</h1>";
  } else {
    window.addEventListener("mousemove", revealContent);
    window.addEventListener("click", revealContent);
  }
}

function revealContent() {
  const heading = document.querySelector("h1");
  const content = document.getElementById("content");

  if (heading) heading.style.display = "none";
  if (content) content.style.display = "block";

  window.removeEventListener("mousemove", revealContent);
  window.removeEventListener("click", revealContent);
}

setTimeout(checkBotAndReveal, 2500);
