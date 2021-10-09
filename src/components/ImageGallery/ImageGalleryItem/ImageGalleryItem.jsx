// import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  // console.log(largeImageURL);
  return (
    <>
      <img
        // onClick={onClick(largeImageURL)}
        src={webformatURL}
        data-src={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </>
  );
}
