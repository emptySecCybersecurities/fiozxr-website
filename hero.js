const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + process.cwd() + "/index.html", { waitUntil: "load" });
  await p.waitForFunction(() => !document.getElementById("intro"), null, { timeout: 20000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: "/tmp/opencode/live.png" });
  const r = await p.evaluate(() => {
    const t = document.querySelector(".hero-title");
    const rects = [...t.querySelectorAll(".w")].map(w => {
      const rect = w.getBoundingClientRect();
      return { text: w.textContent, x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width) };
    });
    return { titleRect: t.getBoundingClientRect().toJSON(), wordCount: rects.length, rects, scrollY: window.scrollY };
  });
  console.log(JSON.stringify(r, null, 2));
  await b.close();
})();
