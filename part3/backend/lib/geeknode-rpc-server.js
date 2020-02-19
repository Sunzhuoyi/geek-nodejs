const RPC = require('./rpc-server');

module.exports = function (protobufRequestSchema, protobufResponseSchema) {
    return new RPC({
        decodeRequest(buffer) {
            const seq = buffer.readUInt32BE();
            return {
                seq: seq,
                result: protobufRequestSchema.decode(buffer.slice(8))
            }
        },
        isCompleteRequest(buffer) {
            const bodyLength = buffer.readUInt32BE(4);
            return 8 + bodyLength;
        },
        encodeResponse(data, seq) {
            const body = protobufResponseSchema.encode(data);
            const head = Buffer.alloc(8);
            head.writeUInt32BE(seq);
            head.writeUInt32BE(body.length, 4);

            return Buffer.concat([head, body])
        }
    })
}