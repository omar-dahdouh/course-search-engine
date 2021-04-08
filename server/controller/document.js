const { posBuffer, docBuffer } = global.myVars;
const { readUInt24 } = require('../util/buffer');
const { readOpenedFile } = require('../util/file');
const { readWord } = require('./word');

async function posBufferRead(pos, len) {
    let buff =  await readOpenedFile(posBuffer, pos, len*2);

    return Array(len).fill()
        .map((x,i) => buff.readUInt16LE(i*2));
}

async function readDocs(pos, len) {
    if (len === 0) return [];
    const buff = await readOpenedFile(docBuffer, pos, len*9);

    const arr = Array(len);
    for (let i=0; i<len; i++) {
        const id = readUInt24(buff, i*9);
        // const link = buff.readUInt32LE(i*9 + 3);
        const count = buff.readUInt16LE(i*9 + 7);
        // arr[i] = [id, await posBufferRead(link, count)];
        arr[i] = [id, count];
    }

    return arr;
}

async function getDocs(term) {
    let [offset, length] = readWord(term);
    return await readDocs(offset, length);
}

module.exports = {
    getDocs
}
