// import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ images }) {
  console.log(images);
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li className="ImageGalleryItem" key={image.id}>
          <ImageGalleryItem {...image} />
        </li>
      ))}
    </ul>
  );
}
