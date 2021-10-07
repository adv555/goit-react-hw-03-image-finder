import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import SearchBar from 'components/Searchbar';
// import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
// import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    loading: false,
    loadMore: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=22901299-3a9abb112bfd753d84521cd93&image_type=photo&orientation=horizontal&per_page=12',
    )
      .then(res => res.json())
      .then(images => images.hits)
      .then(images => {
        this.setState({ images });
        console.log(this.state);
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      // console.log(prevState.searchQuery);
      // console.log(this.state.searchQuery);
      console.log('изменились данные запроса');
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=1&key=22901299-3a9abb112bfd753d84521cd93&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images => images.hits)
        .then(images => {
          this.setState({ images });
          console.log(this.state);
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery: searchQuery });
    console.log(searchQuery);
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />

        {this.state.loading && (
          <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
        )}

        {/* <ImageGallery images={this.state.images} /> */}

        {this.state.loadMore && <Button />}

        <ToastContainer autoClose={3000} theme={'colored'} />
        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;
