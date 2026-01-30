const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "networkidle" });

  // ✅ ensure fonts are ready (Google Fonts)
  await page.evaluate(() => document.fonts.ready);

  // ✅ force @media print rules to apply
  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: "tour-program.pdf",
    printBackground: true,

    // ✅ let CSS @page size win (210mm x 297mm)
    preferCSSPageSize: true,

    // Optional: if you keep format, it can override CSS in some cases
    // format: "A4",

    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log("Saved: tour-program.pdf");
})();
