import config from './config';

export const flatten = arr => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

export const simulateEvent = (target, value) => ({target: { name: target, value } });

export const getServiceUrl = (serviceName) => {
 const serviceConfig = config[serviceName.toUpperCase()];
 const hostname = serviceConfig.host;
 let serviceEndpoint;
 if (hostname.match(/localhost|192\.168\.[01].\d{1,3}/)) {
   serviceEndpoint = `//${hostname}:${serviceConfig.port}`;
 } else {
   serviceEndpoint = `https://${serviceConfig.service}.${hostname}`;
 }
 return `${serviceEndpoint}/${serviceConfig.path}`;
};
