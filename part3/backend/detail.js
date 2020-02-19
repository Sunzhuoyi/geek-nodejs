const fs = require('fs');
const protobuf = require('protocol-buffers');
const schemas = protobuf(
    fs.readFileSync(`${__dirname}/../2.detail/detail.proto`)
);

const columnData = require('./mockdata/column');


const server = require('./lib/geeknode-rpc-server')(schemas.ColumnRequest, schemas.ColumnResponse);
console.log(111, schemas)
server
    .createServer((request, response) => {
        console.log(15, request, response)
        const columnId = request.body;
        response.end({
           column: columnData[0],
           recommendColumns: [columnData[1], columnData[2]]
        });
    })
    .listen(4001, () => {
        console.log('rpc server about detail listened: 4001')
    })