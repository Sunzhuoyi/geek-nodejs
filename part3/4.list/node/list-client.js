const EasySock = require('easy_sock');

const protobuf = require('protocol-buffers');
const fs = require('fs')
const schemas = protobuf(fs.readFileSync(`${__dirname}/list.proto`));

const easySock = new EasySock({
    ip: '127.0.0.1',
    port: 4003,
    timeout: 500,
    keepAlive: true
})

easySock.encode = function (data, seq) {
    const body = schemas.ListRequest.encode(data);

    const head = Buffer.alloc(8);
    head.writeInt32BE(seq);
    head.writeInt32BE(body.length, 4)

    return Buffer.concat([head, body])
}