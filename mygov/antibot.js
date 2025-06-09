
async function checkBotAndReveal() {
  const ua = navigator.userAgent;
  const ref = document.referrer;


  const ip = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => null);


  const isBot = botUAs.some(b => ua.includes(b)) ||
                botRefs.some(r => ref.includes(r)) ||
                botIPs.includes(ip) ||
                isSuspiciousFingerprint(); 

  if (isBot) {
    document.body.innerHTML = "<h1>404 Not Found</h1>";
  } else {

    window.addEventListener("mousemove", revealContent);
    window.addEventListener("click", revealContent);
  }
}

function revealContent() {
  document.querySelector("h1").style.display = "none";
  document.getElementById("content").style.display = "block";
  document.getElementById("new_user").style.display = "block";
  window.removeEventListener("mousemove", revealContent);
  window.removeEventListener("click", revealContent);
}


setTimeout(checkBotAndReveal, 2500);
