import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery, page: 1 });
  };

  render() {
    const {
      handleFormSubmit,
      state: { searchQuery, page },
    } = this;

    return (
      <div className="App">
        <SearchBar onSubmit={handleFormSubmit} />

        <ImageGallery searchQuery={searchQuery} page={page} />

        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}

export default App;
