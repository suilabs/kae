const baseUrl = 'https://static.suilabs.com/';
const FileUpload = {
  url: 'https://static.suilabs.com/images/kae',
  upload: async (file) => {
    const headers = new Headers({
      Accept: 'application/json',
    });
    const form = new FormData();
    form.append('data', file);
    const fetchConf = {
      method: 'POST',
      body: form,
      headers,
    };
    return fetch(FileUpload.url, fetchConf)
      .then(resp => resp.json())
      .then(obj => `${baseUrl}${obj.url}`);
  }
};

export default FileUpload;
