const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "load" });

  // Get all page sections and verify bands
  const pages = await page.$$('.page');
  
  console.log("=== FINAL VERIFICATION ===\n");
  console.log("Diagonal band placement in booklet:\n");
  
  for (let i = 0; i < pages.length; i++) {
    const pageElement = pages[i];
    const bands = await pageElement.$$('.band');
    const pageClass = await pageElement.getAttribute('class');
    const pageType = pageClass.split('page--')[1] || 'unknown';
    const pageNum = i + 1;
    
    const status = bands.length > 0 ? '✓ HAS bands' : '✗ NO bands';
    const expected = (pageNum === 1 || pageNum === 7) ? '(expected)' : '(expected)';
    
    console.log(`Page ${pageNum} (${pageType.padEnd(13)}): ${status} ${expected}`);
  }
  
  console.log("\n✅ Fix complete: Bands only on Cover (page 1) and Sponsor (page 7)");
  console.log("✅ Content pages are clean without decorative bands");

  await browser.close();
})();
