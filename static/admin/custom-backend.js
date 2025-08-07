// /static/admin/custom-backend.js
window.addEventListener("DOMContentLoaded", () => {
  if (!window.CMS) return console.error("CMS not ready");

  // backend class...
  CMS.registerBackend("custom", MyBackendClass);
});
