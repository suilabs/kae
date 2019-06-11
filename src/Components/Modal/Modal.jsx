import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';

const preventEverything = (e) => e.preventDefault();

class Modal extends Component {
  componentDidMount() {
    document.body.classList.add('modal-open');
    const kaeContainer = document.getElementsByClassName('kae-container')[0];
    kaeContainer.addEventListener('click', preventEverything);
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open');
    const kaeContainer = document.getElementsByClassName('kae-container')[0];
    kaeContainer.removeEventListener('click', preventEverything);
  }

  render () {
    const {children} = this.props;
    return ReactDOM.createPortal(
      <div className='modal--wrapper'>
        <button
          onClick={this.props.onClose}
          className='modal__button-close'
        >
          X
        </button>
        { children }
      </div>,
      document.getElementById('modal-container')
    )
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
  onClose: PropTypes.func,
};

Modal.propTypes = {
  children: '',
  onClose: () => {},
};

export default Modal;
