const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Point this to your HTML filename
  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "load" });

  await page.pdf({
    path: "tour-program.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" }
  });

  await browser.close();
  console.log("Saved: tour-program.pdf");
})();
