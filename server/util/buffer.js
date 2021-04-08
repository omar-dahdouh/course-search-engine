function writeUInt24 (buf, val, off) {
    if (val > 16777215) {
        throw 'val must be < 16777216';
    }
    buf.writeUInt8(val & 255, off);
    buf.writeUInt8(val>>8 & 255, off + 1);
    buf.writeUInt8(val>>16 & 255, off + 2);
}

function readUInt24 (buf, off) {
    return buf[off] + (buf[off+1]<<8) + (buf[off+2]<<16);
}

module.exports = {
    writeUInt24,
    readUInt24,
}
