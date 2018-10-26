import React from 'react';
import PropTypes from 'prop-types';
import { ImageSelectorBox } from '../Form';
import { simulateEvent } from '../../Core/Utils';

const ImageStripItem = ({onClick, className, url}) => (
  <button className={`cover-button ${className}`} onClick={onClick}>
    <img src={url} />
  </button>
);

ImageStripItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  url: PropTypes.url,
};

ImageStripItem.defaultProps = {
  className: '',
};

class ImageStrip extends React.Component {
  static propType = {
    srcset: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {
    srcset: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      srcset: props.srcset
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  onClick = (url) => () => {
    if (url !== '/favicon.ico') {
      const newSrcSet = this.state.srcset.filter(src => src !== url);
      this.props.onChange(simulateEvent(this.props.id, newSrcSet.join(';')));
      this.setState({
          srcset: newSrcSet
      })
    }
  };

  onChange = ({target: { value }}) => {
    const { srcset } = this.state;
    srcset.push(value.url);
    this.props.onChange(simulateEvent(this.props.id, srcset.join(';')));
  };

  render() {
    const urls = this.state.srcset;
    return (<div className={'.list'}>
      {urls.map(url =>
        <ImageStripItem key={url} url={url} onClick={this.onClick(url)}/>
      )}
      <ImageSelectorBox src='/favicon.ico' onChange={this.onChange} />
    </div>)
  }
}

export default ImageStrip;