import React from 'react';
import axios from 'axios'

const domaine = "http://192.168.1.79:3000"
export const FilesGet = (url) => {
  // console.log(url);
  // const data = 'url=./hello'
  const data = {
    url: url
  }
  const body = Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.put(domaine + '/list', body, headers)
    .then(response => {
      return response.data;

    })
    .catch(error => {
      console.log(error);
      return {
        error: true
      };
    });

}

export const FilesRemove = (pathItem) => {

  const data = {
    file: pathItem
  }
  const body = Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.put(domaine + '/remove', body, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return {
        error: true
      };
    });

}

export const FilesAdd = (path, file) => {

  const data = {
    fileToDownload: file,
    url: path
  }
  const body = Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.post(domaine + '/add', body, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return {
        error: true
      };
    });

}

export const FolderAdd = (path, name) => {
  const data = {
    foldername: name,
    url: path
  }
  const body = Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.post(domaine + '/add/folder', body, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return {
        error: true
      };
    });

}

export const FilesCutPaste = (path, file) => {

  const data = {
    file: file,
    path: path
  }
  const body = Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.put(domaine + '/cut', body, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return {
        error: true
      };
    });

}