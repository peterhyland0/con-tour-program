const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // OPTIONAL: block slow placeholder images
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (url.includes("picsum.photos")) return route.abort(); // comment out if you want them
    return route.continue();
  });

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  // Faster + more predictable than networkidle
  await page.goto(fileUrl, { waitUntil: "load", timeout: 60000 });

  // Wait for fonts, but don't hang forever
  await page.evaluate(() => Promise.race([
    document.fonts?.ready ?? Promise.resolve(true),
    new Promise(res => setTimeout(res, 5000))
  ]));

  // Wait for paged.js, but add a hard timeout fallback
  await page.evaluate(() => Promise.race([
    window.PAGED_READY ?? Promise.resolve(true),
    new Promise(res => setTimeout(res, 15000))
  ]));

  await page.pdf({
    path: "tour-program.pdf",
    printBackground: true,
    preferCSSPageSize: true,
    format: "A4",
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log("Saved: tour-program.pdf");
})();
