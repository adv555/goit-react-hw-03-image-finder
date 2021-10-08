// import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <>
      <img
        // onClick={onClick}
        src={webformatURL}
        data-src={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </>
  );
}
