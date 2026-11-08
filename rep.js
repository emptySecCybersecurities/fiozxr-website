const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + process.cwd() + "/index.html", { waitUntil: "load" });
  await p.waitForFunction(() => !document.getElementById("intro"), null, { timeout: 20000 });
  const maxY = await p.evaluate(() => document.body.scrollHeight - innerHeight);
  // reproduce render-site.js: rapid scrollTo with smooth behavior
  for (let i = 0; i < 60; i++) { await p.evaluate(y => window.scrollTo(0, y), Math.round(1.0 * maxY)); await p.waitForTimeout(8); }
  await p.waitForTimeout(8);
  await p.screenshot({ path: "/tmp/opencode/rep-bad.png" });
  console.log("scrollY after rapid smooth scroll:", await p.evaluate(() => window.scrollY), "maxY:", maxY);
  // fix: disable smooth, use instant behavior
  await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await p.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), 1.0 * maxY);
  await p.waitForTimeout(400);
  await p.screenshot({ path: "/tmp/opencode/rep-good.png" });
  console.log("scrollY after instant:", await p.evaluate(() => window.scrollY));
  await b.close();
})();
