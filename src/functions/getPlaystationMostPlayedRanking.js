import { load } from 'cheerio';

async function scrapping() {
  const html = await fetch(`https://ps-timetracker.com/statistic/last-30-days`)
    .then(response => response.text());

  const $ = await load(html);

  const $td = $(`tbody > tr:not(.ad)`).children('td');

  const ranking = $td
    .find('a')
    .map((idx, item) => {
      const [el] = item.children;
      return `${ idx } - ${ el.data }`;
    });

  return [...ranking]
    .slice(0, 50)
    .join('\n');
}

export default scrapping;
