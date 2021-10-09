import { Component } from 'react';
import Loader from 'react-loader-spinner';
import ScrollContent from 'components/Scroll';

import FetchImages from 'service/Api';
import ImageGalleryList from 'components/ImageGallery/ImageGalleryList';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    // searchQuery: '',
    images: [],
    page: 1,
    loadMore: false,
    error: null,
    status: 'idle',
    showModal: false,
  };
  componentDidMount() {
    // console.log('ModalDidMount');
    window.addEventListener('click', this.handleClick);
  }
  componentWillUnmount() {
    // console.log('ModalUnMount');
    window.removeEventListener('click', this.handleClick);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      console.log(nextPage);

      FetchImages(nextSearchQuery, nextPage)
        .then(images => images.hits)
        .then(images => {
          this.setState(
            {
              images: [...prevState.images, ...images],
              loadMore: true,
              status: 'resolved',
            },
            // ScrollContent,
          );
          if (nextPage > 1) {
            ScrollContent();
          }
          // console.log(prevState.images);
          // console.log(this.state.images);
        })
        .catch(error => this.setState({ error, status: 'rejected' })); //== если не 404
    }
  }

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    console.log(page);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClick = e => {
    // console.log(e.target.nodeName);
    if (e.target.nodeName === 'IMG') {
      console.log(e.target.nodeName);
      this.toggleModal();
    }
  };

  render() {
    const { status, error, images, loadMore, showModal } = this.state;

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
          <ImageGalleryList images={images} onClick={this.handleClick} />
          {loadMore && <Button onClick={this.onLoadMore} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={images.largeImageURL} alt={images.tag} />
            </Modal>
          )}
        </div>
      );
  }
}

export default ImageGallery;
