import { stripHTMLFromString } from '../utils';

export const getSearchEndpoint = query =>
  `https://api.tvmaze.com/search/shows?q=${query}`;

export const getEpisodesEndpoint = showId =>
  `https://api.tvmaze.com/shows/${showId}/episodes`;

export const formatShowResults = results =>
  results.map(({ show }) => ({
    id: show.id,
    name: show.name,
    image: show.image && show.image.original,
    status: show.status,
    type: show.type,
    summary: stripHTMLFromString(show.summary),
    region: show.network && show.network.country && show.network.country.code,
  }));

export const formatEpisodeResults = results =>
  results.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
    airstamp: episode.airstamp,
  }));
