// import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

export default function ImageGalleryList({ images, onImageClick }) {
  // console.log(images, onImageClick);
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li className="ImageGalleryItem" key={image.id}>
          <ImageGalleryItem {...image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
