import puppeteer from 'puppeteer';

async function getXboxMostPlayedRanking() {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  await page.goto(`https://www.microsoft.com/en-us/store/most-played/apps/xbox`);

  const ranking = await page.evaluate(() => {
    const items = [];
    const elements = document.querySelectorAll('h3.base > a');
    for (let [idx, el] of elements.entries()) {
      const row = `${ ++idx } - ${ el.textContent }`;
      items.push(row);
    }

    return items;
  });

  await browser.close();

  return ranking.join('\n');
}

export default getXboxMostPlayedRanking;
