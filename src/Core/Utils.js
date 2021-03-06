import config from './config';

export const flatten = arr => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

export const simulateEvent = (target, value) => ({target: { name: target, value } });

export const getServiceUrl = (serviceName) => {
 const serviceConfig = config[serviceName.toUpperCase()];
 const hostname = serviceConfig.host;
 let serviceEndpoint;
 if (['localhost', '192.168.1.134'].includes(hostname)) {
   serviceEndpoint = `//${hostname}:${serviceConfig.port}`;
 } else {
   serviceEndpoint = `https://${serviceConfig.service}.${hostname}`;
 }
 return `${serviceEndpoint}/${serviceConfig.path}`;
};