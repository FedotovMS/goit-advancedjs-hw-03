import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_dSKOi2g6r5Z5MXH90zLdHueXv61ZIwwb7sExKgfYdJ0iHORzscUt4tqpFuOZVH5w';
export async function fetchBreeds() {
  return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
}

export async function fetchBreedById(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data[0]);
}
