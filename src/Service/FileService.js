import { getServiceUrl } from '../Core/Utils';

const FileService = {
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
    return fetch(FileService.url, fetchConf)
      .then(resp => resp.json());
  },
};

export default FileService;
