import { getServiceUrl } from '../Core/Utils';

const FileUpload = {
  url: getServiceUrl('statics'),
  upload: async (file) => {
    const headers = new Headers({
      Accept: 'application/json',
    });
    const form = new FormData();
    form.append('file', file);
    const fetchConf = {
      method: 'POST',
      body: form,
      headers,
    };
    return fetch(FileUpload.url, fetchConf)
      .then(resp => resp.json())
      .then(obj => obj.url);
  }
};

export default FileUpload;
