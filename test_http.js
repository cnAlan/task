const http = require('http')
const server = http.createServer((req, res)=> {
    res.end('HelloMyCommandLineTools!')
})
exports.listen = port=> server.listen(port, function(err) {
    console.log(err)
})
module.export = http
