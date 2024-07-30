import puppeteer from 'puppeteer';

export async function generator() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({
    width: 640,
    height: 180,
    deviceScaleFactor: 1,
  });
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle2',
  });
  const screenshot = await page.screenshot({
    omitBackground: true,
    type: 'png',
  });

  await browser.close();

  return screenshot;
}
