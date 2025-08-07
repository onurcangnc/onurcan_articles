/* /static/admin/custom-backend.js */
class CustomBackend {
  constructor(config) {
    this.cfg = config;                       // düz obje
    this.url = config.entries_url;           // "/.netlify/functions/entry"
  }

  auth() {
    const t = localStorage.getItem("auth_token");
    if (!t) throw new Error("No token");
    return { token: t };
  }

  _req(u, o = {}) {
    const t = localStorage.getItem("auth_token");
    return fetch(u, {
      ...o,
      headers: { ...(o.headers || {}), Authorization: `Bearer ${t}` },
    }).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
  }

  listEntries()        { return this._req(this.url); }
  getEntry(slug)       { return this._req(`${this.url}?slug=${slug}`); }
  persistEntry(e)      { return this._req(this.url, { method: "POST", body: JSON.stringify(e) }); }
  updateEntry(e)       { return this._req(this.url, { method: "PUT",  body: JSON.stringify(e) }); }
  deleteEntry(slug)    { return this._req(`${this.url}?slug=${slug}`, { method: "DELETE" }); }
}

CMS.registerBackend("custom", CustomBackend);
