function prettyTime(str) {
    var d = str.slice(0, 10)
    var t = str.slice(11, 16)
    return d + ' ' + t
}

module.exports = {
  prettyTime: prettyTime
}
