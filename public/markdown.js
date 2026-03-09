const GITHUB_ALERTS = {
  note: { keyword: "NOTE", octicon: "info" },
  tip: { keyword: "TIP", octicon: "light-bulb" },
  important: { keyword: "IMPORTANT", octicon: "report" },
  warning: { keyword: "WARNING", octicon: "alert" },
  caution: { keyword: "CAUTION", octicon: "stop" },
};

function dashToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

class MdViewer extends HTMLElement {
  static get observedAttributes() {
    return ["src", "css"];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });

    this._linkEl = document.createElement("link");
    this._linkEl.rel = "stylesheet";

    this._container = document.createElement("div");
    this._container.className = "md";
    this._container.innerHTML = "<em>Loading…</em>";

    this._shadow.append(this._linkEl, this._container);

    this._octiconsPromise = null;
  }

  connectedCallback() {
    this._applyCssHref();
    this.load();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "css") this._applyCssHref();
    if (name === "src") this.load();
  }

  _applyCssHref() {
    const cssHref = this.getAttribute("css") || "/markdown-styles.css";
    this._linkEl.href = cssHref;
  }

  async _ensureOcticons() {
    if (this._octiconsPromise) return this._octiconsPromise;

    // Option A (no build step): load Octicons from a CDN as ESM.
    // Pinning a version is recommended; update whenever you like.
    // (Octicons is GitHub's icon set.) :contentReference[oaicite:3]{index=3}
    const url = "https://cdn.jsdelivr.net/npm/@primer/octicons@19.21.1/+esm";

    this._octiconsPromise = import(url)
      .then((mod) => mod.default ?? mod)
      .catch(() => null);

    return this._octiconsPromise;
  }

  _resolveOcticon(octicons, name) {
    if (!octicons || !name) return null;

    // Different bundles/export styles may key icons differently; try a few.
    return (
      octicons[name] ||
      octicons[dashToCamel(name)] ||
      octicons[`${dashToCamel(name)}Icon`] ||
      octicons[`${dashToCamel(name)}16Icon`] ||
      null
    );
  }

  _parseGithubAlertFromText(text) {
    // Matches:
    // [!NOTE]
    // [!WARNING] Optional custom title (supported by some renderers; safe to allow)
    const m = (text || "").trimStart().match(
      /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:[ \t]+([^\r\n]+))?/i
    );
    if (!m) return null;

    const type = m[1].toLowerCase();
    const customTitle = m[2]?.trim();
    const title = customTitle ? customTitle : m[1].toUpperCase();

    return { type, title };
  }

  _stripFirstLineFromParagraph(p) {
    // Remove everything up to the first newline OR <br>, preserving any HTML that comes after.
    let node = p.firstChild;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "BR") {
        node.remove();
        break;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent || "";
        const i = t.search(/\r?\n/);
        if (i !== -1) {
          node.textContent = t.slice(i + 1).replace(/^\s+/, "");
          break;
        }
      }

      const next = node.nextSibling;
      node.remove();
      node = next;
    }

    // Trim leading whitespace if needed
    if (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
      p.firstChild.textContent = (p.firstChild.textContent || "").replace(/^\s+/, "");
    }
  }

  _upgradeGithubAlerts(rootEl) {
    const blockquotes = Array.from(rootEl.querySelectorAll("blockquote"));

    for (const bq of blockquotes) {
      const firstP = bq.querySelector(":scope > p");
      if (!firstP) continue;

      const meta = this._parseGithubAlertFromText(firstP.textContent || "");
      if (!meta || !GITHUB_ALERTS[meta.type]) continue;

      // Remove the alert marker line from the content
      this._stripFirstLineFromParagraph(firstP);

      // If the paragraph became empty, drop it (common when marker is on its own line)
      const isEmpty =
        !firstP.textContent?.trim() && !Array.from(firstP.childNodes).some((n) => {
          return n.nodeType === Node.ELEMENT_NODE || (n.textContent || "").trim();
        });
      if (isEmpty) firstP.remove();

      // Build GitHub-like structure :contentReference[oaicite:4]{index=4}
      const wrapper = document.createElement("div");
      wrapper.className = `markdown-alert markdown-alert-${meta.type}`;
      wrapper.dir = "auto";

      const titleP = document.createElement("p");
      titleP.className = "markdown-alert-title";
      titleP.dir = "auto";
      titleP.dataset.alertType = meta.type;
      titleP.append(document.createTextNode(meta.title));

      wrapper.append(titleP);

      // Move remaining content into wrapper
      while (bq.firstChild) wrapper.append(bq.firstChild);

      bq.replaceWith(wrapper);
    }
  }

  async _injectGithubAlertIcons(rootEl) {
    const octicons = await this._ensureOcticons();
    if (!octicons) return;

    const titles = rootEl.querySelectorAll(".markdown-alert-title");
    titles.forEach((titleP) => {
      if (titleP.querySelector("svg")) return;

      const type = titleP.dataset.alertType;
      const iconName = GITHUB_ALERTS[type]?.octicon;
      const icon = this._resolveOcticon(octicons, iconName);
      if (!icon?.toSVG) return;

      // Octicons can output SVG strings directly :contentReference[oaicite:5]{index=5}
      const svgStr = icon.toSVG({ width: 16, height: 16, "aria-hidden": "true" });

      const tpl = document.createElement("template");
      tpl.innerHTML = svgStr.trim();
      const svg = tpl.content.firstElementChild;
      if (!svg) return;

      svg.classList.add("markdown-alert-icon");
      titleP.prepend(svg);
    });
  }

  _forceLinksBlank(rootEl) {
    rootEl.querySelectorAll("a[href]").forEach((a) => {
      a.setAttribute("target", "_blank");
      // security + performance best practice for target=_blank
      // (keeps opener from being accessible)
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  async load() {
    const src = this.getAttribute("src");
    if (!src) {
      this._container.innerHTML = "<em>No src provided.</em>";
      return;
    }

    this._container.innerHTML = "<em>Loading…</em>";

    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${src}`);
      const md = await res.text();

      const html = marked.parse(md, { gfm: true, breaks: false });

      const safe = DOMPurify.sanitize(html, {
        FORBID_TAGS: ["style"],
        FORBID_ATTR: ["style"],
      });

      this._container.innerHTML = `<div class="markdown">${safe}</div>`;

      const root = this._container.querySelector(".markdown");
      if (root) {
        this._upgradeGithubAlerts(root);
        await this._injectGithubAlertIcons(root);
        this._forceLinksBlank(root);
      }
    } catch (err) {
      this._container.innerHTML =
        `<pre style="white-space:pre-wrap;">Error: ${String(err.message || err)}</pre>`;
    }
  }
}

customElements.define("md-viewer", MdViewer);