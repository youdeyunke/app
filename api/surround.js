let request = require('../utils/request');

export function getSurroundList(query) {
  return request.get("http://192.168.31.45:8080/api/v6/surround/", query);
}