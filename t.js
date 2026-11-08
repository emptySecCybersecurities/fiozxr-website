const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + process.cwd() + "/index.html", { waitUntil: "load" });
  await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await p.waitForFunction(() => !document.getElementById("intro"), null, { timeout: 20000 });
  const maxY = await p.evaluate(() => document.body.scrollHeight - innerHeight);
  await p.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), 0.22 * maxY);
  await p.waitForTimeout(700);
  await p.screenshot({ path: "/tmp/opencode/t-clip.png", clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  await p.screenshot({ path: "/tmp/opencode/t-full.png" });
  const dims = await p.evaluate(() => ({ iw: innerWidth, ih: innerHeight }));
  console.log(JSON.stringify(dims));
  await b.close();
})();
