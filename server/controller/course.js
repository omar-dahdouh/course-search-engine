const { dataBuffer, indexBuffer } = global.myVars;
const { readUInt24 } = require('../util/buffer');
const { readOpenedFile } = require('../util/file');

async function loadCourse(address) {
    let buff;
    let offset = address;
    let course = {};

    buff = await readOpenedFile(dataBuffer, offset, 8);
    course.src = buff[0];
    course.date = new Date(readUInt24(buff, 1)*100000);
    let urlLen = buff[4];
    let imgLen = buff[5];
    let ttlLen = buff[6];
    let dscLen = buff[7];
    offset += 8;

    buff = await readOpenedFile(dataBuffer, offset, urlLen);
    course.url = buff.toString();
    offset += urlLen;

    buff = await readOpenedFile(dataBuffer, offset, imgLen);
    course.image = buff.toString();
    offset += imgLen;
    
    buff = await readOpenedFile(dataBuffer, offset, ttlLen);
    course.title = buff.toString();
    offset += ttlLen;

    buff = await readOpenedFile(dataBuffer, offset, dscLen);
    course.description = buff.toString();

    return course;
}

async function getCourse(id) {
    const address = indexBuffer.readUInt32LE(id * 4);
    return await loadCourse(address);
}

module.exports = {
    getCourse,
}
