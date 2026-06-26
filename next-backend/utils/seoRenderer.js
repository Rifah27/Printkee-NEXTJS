const fs = require("fs");
const path = require("path");

function renderSEO({ title, description, canonical, seoContent }) {
  const distPath = path.join(__dirname, "../../frontend/dist/index.html");
  const srcPath = path.join(__dirname, "../../frontend/index.html");

  let indexPath = distPath;
  if (!fs.existsSync(distPath)) {
    indexPath = srcPath;
  }

  if (!fs.existsSync(indexPath)) {
    throw new Error("index.html not found in dist or src");
  }

  let html = fs.readFileSync(indexPath, "utf8");

  if (title) {
    if (html.includes("__TITLE__")) {
      html = html.split("__TITLE__").join(title);
    } else {
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
  }

  if (description) {
    if (html.includes("__DESCRIPTION__")) {
      html = html.split("__DESCRIPTION__").join(description);
    } else {
      if (html.includes('name="description"')) {
        html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`);
      }
    }
  }

  if (canonical) {
    if (html.includes("__CANONICAL__")) {
      html = html.split("__CANONICAL__").join(canonical);
    } else {
      if (html.includes('rel="canonical"')) {
        html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
      }
    }
  }

  // 4. Replace SEO Content
  if (html.includes("__SEO_CONTENT__")) {
    html = html.split("__SEO_CONTENT__").join(seoContent || "");
  }

  return html;
}

module.exports = renderSEO;