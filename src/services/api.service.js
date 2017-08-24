const unwrap = response => {
  if (response.status !== 200) {
    console.log(response.status, response);
    throw new Error(response);
  }

  return response.json();
}

export const getAuthUserData = (token) => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return fetch('./users/me', { headers })
    .then(unwrap)
    .then(json => {
      console.log(json);
      return json;
    })
};
