import React from 'react';
import bus from '../Core/bus';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: '',
    };

    // this.successCallback = this.successCallback.bind(this);
  }

  componentWillMount() {
    bus.subscribe('success', this.successCallback);
    bus.subscribe('error', this.errorCallback);
  }

  componentWillUnmount() {
    bus.unsubscribe('success', this.successCallback);
    bus.unsubscribe('error', this.errorCallback);
  }

  successCallback = (msg) => {
    this.setState({
      message: msg,
    });
  };

  errorCallback = (msg) => {
    this.setState({
      error: msg,
    });
  };

  render() {
    const { error, message } = this.state;

    return [
      error ? <div style={{border: '1px solid red'}}>
        { error }
      </div> : null,
      message ? <div style={{border: '1px solid green'}}>
        { message }
      </div> : null,
    ]
  }
}

export default MessageBox;
