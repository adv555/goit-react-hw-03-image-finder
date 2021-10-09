// import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

export default function ImageGalleryList({ images }, onClick) {
  // console.log(images);

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
