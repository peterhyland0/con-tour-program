const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "load" });

  // Get all page sections
  const pages = await page.$$('.page');
  
  console.log(`Found ${pages.length} pages\n`);
  
  // Check which pages have bands
  for (let i = 0; i < pages.length; i++) {
    const pageElement = pages[i];
    const hasBands = await pageElement.$$eval('.band', bands => bands.length > 0);
    const pageClass = await pageElement.getAttribute('class');
    const pageNum = await pageElement.$eval('.page__number', el => el.textContent.trim()).catch(() => 'Cover');
    
    console.log(`Page ${i + 1} (${pageClass}): ${hasBands ? 'HAS' : 'NO'} bands - Page number: ${pageNum}`);
    
    // Take screenshot
    await pageElement.screenshot({ path: `/tmp/page_${i + 1}_screenshot.png` });
  }

  await browser.close();
})();
