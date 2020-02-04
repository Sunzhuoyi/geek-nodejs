const fs = require('fs');
const protobuf = require('protocol-buffers');
const schemas = protobuf(
    fs.readFileSync(`${__dirname}/../2.detail.proto`)
);

const columnData = require('./mockdata/column');



const server = require('./lib/geeknode-rpc-server')(schemas.ColumnRequest, schemas.ColumnResponse);

server
    .createServer((request, response) => {
        const columnId = request.body;
        response.end({
           column: columnData[0],
           recommendColumns: [columnData[1], columnData[2]]
        });
    })
    .listen(4000, () => {
        console.log('rpc server about detail listened: 4000')
    })