const { wordBuffer, suggBuffer } = global.myVars;
const { readUInt24 } = require('../util/buffer');
const MaxHeap = require('../util/maxHeap');

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

function findTopWords(info, limit) {
    const queue = new MaxHeap();
    const results = [];
    let node = info;
    let count = 0;
    let offset, prefix, score, nextScore;
    
    while (node && count < limit) {
        [offset, prefix, score] = node;

        while(true) {
            next =  readUInt24(suggBuffer, offset+1);
            
            if (next !== 0) {
                nextScore = readUInt24(suggBuffer, next-3);
                queue.push([next, prefix, nextScore], nextScore);
            }

            code = suggBuffer[offset];
            if (code === 0) {
                results.push([prefix, score]);
                count ++;
                break;
            }
            prefix += String.fromCharCode(code);
            offset += 4;
        }
        node = queue.pop();
    }
    return results;
}

function suggestions(word, limit=8) {
    const chars = [...Buffer.from(word)];
    let index = 0;
    let offset = 3;
    let target = chars[index++]
    let score = readUInt24(suggBuffer, offset-3);
    let code = suggBuffer[offset];

    while (true) {
        code = suggBuffer[offset];
        if (code === target) {
            target = chars[index++];
            if (target) {
                offset += 4;
            } else {
                return findTopWords([offset+4, word, score], limit);
            }
        } else {
            offset = readUInt24(suggBuffer, offset+1);
            score = readUInt24(suggBuffer, offset-3);
            if (offset === 0) {
                return [];
            }
        }
    }
}

module.exports = {
    readWord,
    suggestions,
}
