import bus from './bus';

describe('Bus', () => {
  afterEach(() => {
    bus.shutdown();
  });

  it('can subscribe to channel', () => {
    bus.subscribe('channel', () => {});

    expect(Object.keys(bus.channels).length).toEqual(1);
  });

  it('can unsubscribe from channel', (done) => {
    const callback = () => {
      done.fail();
    };
    bus.subscribe('channel', callback);

    expect(Object.keys(bus.channels).length).toEqual(1);
    bus.unsubscribe('channel', callback);
    bus.publish('channel', 1);
    done();
  });

  it('can publish to a channel', (done) => {
    bus.subscribe('channel', (data) => {
      expect(data).toEqual(1);
      done();
    });

    bus.publish('channel', 1);
  });

  it('can replay events', (done) => {
    bus.publish('channel', 2);

    expect(bus.channels['channel'].eventPool.length).toEqual(1);
    bus.subscribe('channel', (data) => {
      expect(data).toEqual(2);
      done();
    }, true);
  })
});
