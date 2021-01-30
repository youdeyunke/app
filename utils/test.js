module.exports = {
    name: '',
    hello: function () {
        console.log('hello:', this.name)
    },
    setName: function (name) {
        console.log('set name to :', name)
        this.name = name
        this.hello()
    }
}