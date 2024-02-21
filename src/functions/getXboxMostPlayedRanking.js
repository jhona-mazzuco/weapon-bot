import { load } from 'cheerio';

async function getXboxMostPlayedRanking() {
  const html = await fetch(`https://www.microsoft.com/en-us/store/most-played/apps/xbox`)
    .then(response => response.text());

  const $ = await load(html);

  const listItems = $('h3.base > a');

  const ranking = listItems.map((idx, item) => {
    const [el] = item.children;
    return `${ ++idx } -  ${ el.data }`;
  });

  return [...ranking].join('\n');
}

export default getXboxMostPlayedRanking;
