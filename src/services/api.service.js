const unwrap = response => {
  if (response.status !== 200) {
    throw new Error(response);
  }

  return response.json();
}

export const getAuthUserData = () => (
  fetch('./users/me')
    .then(unwrap)
    .then(json => {
      console.log(json);
      return json;
    })
);
