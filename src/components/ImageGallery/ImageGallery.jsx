import { Component } from 'react';
import Loader from 'react-loader-spinner';
import ScrollContent from 'components/Scroll';

import FetchImages from 'service/Api';
import ImageGalleryList from 'components/ImageGallery/ImageGalleryList';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loadMore: false,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    imageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      // this.setState({ status: 'pending' });

      FetchImages(nextSearchQuery, nextPage)
        .then(images => images.hits)
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images],
            loadMore: true,
            status: 'resolved',
          });
          if (nextPage > 1) {
            ScrollContent();
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' })); //== если не 404
    }
  }

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImageClick = e => {
    const dataSrc = e.target.dataset.src;
    const alt = e.target.alt;
    this.setState({
      largeImageURL: dataSrc,
      imageAlt: alt,
      showModal: true,
    });
  };

  render() {
    const {
      status,
      error,
      images,
      loadMore,
      showModal,
      largeImageURL,
      imageAlt,
    } = this.state;

    if (status === 'idle')
      return <h1 style={{ color: '#3f51b5' }}>Enter Your Request</h1>;

    if (status === 'pending')
      return (
        <div>
          <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
        </div>
      );

    if (status === 'rejected') return <h1>{error.message}</h1>;

    if (status === 'resolved' && images.length < 1)
      return (
        <h2 style={{ color: 'tomato' }}>
          No image has been found. Please enter a more specific query!
        </h2>
      );

    if (status === 'resolved')
      return (
        <div>
          <ImageGalleryList images={images} onImageClick={this.onImageClick} />
          {loadMore && <Button onClick={this.onLoadMore} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img
                src={largeImageURL}
                alt={imageAlt}
                style={{ maxHeight: '80vh', background: 'white' }}
              />
            </Modal>
          )}
        </div>
      );
  }
}

export default ImageGallery;
