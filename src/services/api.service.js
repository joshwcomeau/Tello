import { getEpisodesEndpoint } from '../helpers/tv-maze.helpers';

const unwrap = response => {
  if (response.status !== 200) {
    console.error('Error fetching data', response.status, response);
    throw new Error(response);
  }

  return response.json();
};

const getAuthHeaders = token =>
  new Headers({
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

export const getAuthUserData = ({ token }) => {
  const headers = getAuthHeaders(token);

  return fetch('/users/me', { headers }).then(unwrap);
};

export const postNewlyTrackedShows = ({ token, shows }) => {
  const headers = getAuthHeaders(token);

  const options = {
    method: 'POST',
    body: JSON.stringify({ shows }),
    headers,
  };

  return fetch('/shows/create', options).then(unwrap);
};

export const getEpisodesForShow = ({ showId }) => {
  return fetch(getEpisodesEndpoint(showId)).then(unwrap);
};

export const patchEpisodes = ({ token, showId, episodeIds, markAs }) => {
  const headers = getAuthHeaders(token);

  const options = {
    method: 'PATCH',
    body: JSON.stringify({ episodeIds, markAs }),
    headers,
  };

  return fetch(`/shows/${showId}/episodes`, options).then(unwrap);
};

export const deleteShow = ({ token, showId }) => {
  const headers = getAuthHeaders(token);

  const options = { method: 'DELETE', headers };

  return fetch(`/shows/${showId}`, options).then(unwrap);
};
