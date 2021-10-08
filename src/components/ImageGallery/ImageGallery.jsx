import { Component } from 'react';
import Loader from 'react-loader-spinner';
import ScrollContent from 'components/Scroll';

import FetchImages from 'service/Api';
import ImageGalleryList from 'components/ImageGallery/ImageGalleryList';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    // searchQuery: '',
    images: [],
    page: 1,
    loadMore: false,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      FetchImages(nextSearchQuery, nextPage)
        .then(images => images.hits)
        .then(images => {
          this.setState(
            {
              images: [...prevState.images, ...images],
              loadMore: true,
              status: 'resolved',
            },
            ScrollContent,
          );
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

  render() {
    const { status, error, images, loadMore } = this.state;

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
          <ImageGalleryList images={images} />
          {loadMore && <Button onClick={this.onLoadMore} />}
        </div>
      );
  }
}

export default ImageGallery;
