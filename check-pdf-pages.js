const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve("/home/runner/work/con-tour-program/con-tour-program", "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });

  // Take a screenshot to see what's happening
  await page.screenshot({ 
    path: "/tmp/print-view.png", 
    fullPage: true 
  });

  // Get page dimensions
  const dimensions = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    return Array.from(pages).map((p, i) => ({
      index: i,
      height: p.offsetHeight,
      width: p.offsetWidth,
      top: p.offsetTop,
      breakAfter: window.getComputedStyle(p).breakAfter
    }));
  });

  console.log("Page elements:", JSON.stringify(dimensions, null, 2));

  await browser.close();
})();
