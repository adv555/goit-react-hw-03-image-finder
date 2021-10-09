import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Modal from 'components/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    // showModal: false,
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({ showModal: !showModal }));
  // };

  handleFormSubmit = searchQuery => {
    // console.log(searchQuery);
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />

        <ImageGallery searchQuery={searchQuery} />

        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}

export default App;
