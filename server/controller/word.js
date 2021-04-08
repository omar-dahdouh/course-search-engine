const { wordBuffer } = global.myVars;
const { readUInt24 } = require('../util/buffer');

function readWord(word) {
    const chars = Buffer.from(word + '\0');
    
    let length, code, offset=0, pos=0, idx=0;
    let count = wordBuffer[offset++];
    let targetCode = chars[idx++];

    while (true) {
        code = wordBuffer[offset + pos*5];
        if (code === targetCode) {
            if (code === 0) {
                length = readUInt24(wordBuffer, offset + count*5);
                offset = wordBuffer.readUInt32LE(offset + pos*5 + 1);
                return [offset, length];
            } else {
                offset = wordBuffer.readUInt32LE(offset + pos*5 + 1);
                count = wordBuffer[offset++];
                targetCode = chars[idx++];
                pos = 0;
            }
        } else {
            pos = (pos<<1) + (code < targetCode ? 2 : 1);
            if (pos >= count) {
                return [0, 0];
            }
        }
    }
}

module.exports = {
    readWord,
}
