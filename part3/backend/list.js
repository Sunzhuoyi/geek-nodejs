const fs = require('fs')
const protobuf = require('protocol-buffers')
const schemas = protobuf(
    fs.readFileSync(`${__dirname}/../4.list/node/list.proto`)
)