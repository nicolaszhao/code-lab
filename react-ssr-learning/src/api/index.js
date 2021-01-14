import fetch from 'isomorphic-fetch';

export function fetchPopularRepos(language = 'all') {
  const url = encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  return fetch(url)
    .then(data => data.json())
    .then(res => res.items)
    .catch(err => console.warn(err));
}
