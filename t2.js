const { chromium } = require("playwright");
const settle = (p) => p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + process.cwd() + "/index.html", { waitUntil: "load" });
  await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await p.waitForFunction(() => !document.getElementById("intro"), null, { timeout: 20000 });
  const maxY = await p.evaluate(() => document.body.scrollHeight - innerHeight);
  await p.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), 0.72 * maxY);
  await settle(p);
  await p.waitForTimeout(300);
  await p.screenshot({ path: "/tmp/opencode/t2-hold.png" });
  const geo = await p.evaluate(() => {
    const t = document.querySelector(".hero-title");
    const r = [...t.querySelectorAll(".w")].map(w => Math.round(w.getBoundingClientRect().y));
    return { scrollY: window.scrollY, ys: r, navBlur: getComputedStyle(document.querySelector(".nav")).backdropFilter };
  });
  console.log(JSON.stringify(geo));
  await b.close();
})();
