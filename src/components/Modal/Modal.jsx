import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    // console.log('ModalDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    // console.log('ModalUnMount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;

// import * as basicLightbox from 'basiclightbox';

// export default function (e) {
//   const dataSrc = e.target.dataset.src;
//   // console.log(e.target.nodeName);
//   // console.log(dataSrc);
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   } else if (dataSrc) {
//     const instance = basicLightbox.create(`
//         <img src="${dataSrc}" width="800" height="600">
//     `);

//     instance.show();
//   }
// }
