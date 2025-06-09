function isSuspiciousFingerprint() {
  // Timezone check — bots often run on UTC (offset = 0)
  const timezoneOffset = new Date().getTimezoneOffset();
  if (timezoneOffset === 0) return true;

  // Canvas fingerprint check
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("test123", 2, 2);
  const fingerprint = canvas.toDataURL();

  if (fingerprint.length < 5000) return true; // short means likely emulated

  // Device memory (optional)
  if (navigator.deviceMemory && navigator.deviceMemory < 1) return true;

  return false;
}
