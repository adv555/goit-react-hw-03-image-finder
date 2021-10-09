// import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) {
  // console.log(largeImageURL);
  return (
    <>
      <img
        onClick={e => {
          onImageClick(e);
        }}
        src={webformatURL}
        data-src={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </>
  );
}
