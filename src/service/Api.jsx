const API_KEY = `22901299-3a9abb112bfd753d84521cd93`;
const BASE_URL = `https://pixabay.com/api/`;

const FetchImages = (searchQuery, page = 1, perPage = 12) => {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return fetch(url).then(response => {
    // console.log(searchQuery);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `по вашему запосу ${this.state.searchQuery}  нічего не найдено`,
      ),
    ); // если 404
  });
};
export default FetchImages;
