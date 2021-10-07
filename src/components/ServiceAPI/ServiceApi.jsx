// import PropTypes from 'prop-types';

function FetchImages({ searchQuery, page }) {
  const API_KEY = `22901299-3a9abb112bfd753d84521cd93`;
  const BASE_URL = `https://pixabay.com/api/`;
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url)
    .then(res => res.json())
    .then(console.log())
    .catch(error => console.log(error));
}

export default FetchImages;
