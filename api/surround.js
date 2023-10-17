let request = require('../utils/request');

export function getSurroundList(query) {
  return request.get("/api/v6/surround/", query);
}