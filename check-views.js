const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  // First check regular screen view
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  
  await page.screenshot({ 
    path: "/tmp/screen-view.png", 
    fullPage: true 
  });
  
  console.log("Screen view saved to /tmp/screen-view.png");

  // Now check print view
  await page.emulateMedia({ media: "print" });
  
  await page.screenshot({ 
    path: "/tmp/print-view.png", 
    fullPage: true 
  });
  
  console.log("Print view saved to /tmp/print-view.png");
  
  // Count elements
  const pageElements = await page.evaluate(() => {
    return document.querySelectorAll('.page').length;
  });
  
  console.log(`Number of .page elements in DOM: ${pageElements}`);

  await browser.close();
})();
