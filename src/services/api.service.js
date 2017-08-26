const unwrap = response => {
  if (response.status !== 200) {
    console.error('Error fetching data', response.status, response);
    throw new Error(response);
  }

  return response.json();
}

export const getAuthUserData = (token) => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return fetch('./users/me', { headers }).then(unwrap);
};
