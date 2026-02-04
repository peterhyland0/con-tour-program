const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, "index.html");
  const fileUrl = pathToFileURL(htmlPath).href;

  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });

  // Generate PDF with multiple pages
  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  // Write to a test file
  fs.writeFileSync("/tmp/test-output.pdf", pdfBuffer);

  // Try to count pages in the generated PDF
  const pdfString = pdfBuffer.toString('latin1');
  const pageCount = (pdfString.match(/\/Type\s*\/Page[^s]/g) || []).length;
  
  console.log("Generated PDF page count:", pageCount);
  console.log("Expected page count: 7 (one for each section)");

  // Check if pages are being duplicated
  if (pageCount === 14) {
    console.log("\n⚠️  ISSUE CONFIRMED: PDF has 14 pages instead of 7 - each page is duplicated!");
  } else if (pageCount === 7) {
    console.log("\n✓ PDF has correct number of pages (7)");
  } else {
    console.log(`\n⚠️  Unexpected page count: ${pageCount}`);
  }

  await browser.close();
})();
