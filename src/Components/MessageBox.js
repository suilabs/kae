import React from 'react';
import bus from '../Core/bus';

import './MessageBox.css';

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
    bus.subscribe('clearMessage', this.clearMessages);
  }

  componentWillUnmount() {
    bus.unsubscribe('success', this.successCallback);
    bus.unsubscribe('error', this.errorCallback);
    bus.unsubscribe('clearMessage', this.clearMessages);
  }

  clearMessages = () => {
    this.setState({
      message: '',
      error: '',
    });
  };

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
      error ? <div className="messageBox-error">
        { error }
      </div> : null,
      message ? <div className="messageBox-success">
        { message }
      </div> : null,
    ]
  }
}

export default MessageBox;
