class Channel {
  constructor(callback) {
    this.eventPool = [];
    this.subscribers = [];
    if (callback) {
      this.subscribe(callback);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback);
    this.subscribers.splice(index, 1);
  }

  publish(data) {
    this.eventPool.push(data);
    this.subscribers.forEach(c => c(data));
  }

  replay(callback) {
    this.eventPool.forEach(data => callback(data));
  }
}

const bus = {
  channels: {},
  subscribe: (channel, callback, replayEvents) => {
    if (channel in bus.channels) {
      bus.channels[channel].subscribe(callback);
    } else {
      bus.channels[channel] = new Channel(callback);
    }
    if (replayEvents) {
      bus.channels[channel].replay(callback);
    }
  },
  publish: (channel, data) => {
      if (!(channel in bus.channels)) {
        bus.channels[channel] = new Channel();
      }
      bus.channels[channel].publish(data);
  },
  unsubscribe: (channel, callback) => {
    if (!(channel in bus.channels)) { return }
    bus.channels[channel].unsubscribe(callback);
  },
  shutdown: () => {
    bus.channels = {};
  }
};

export default bus;
