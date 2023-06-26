let request = require('../utils/request.js');

export function  getEnumList(cat){
  return request.get("/api/v6/enum", {cat:cat});
}