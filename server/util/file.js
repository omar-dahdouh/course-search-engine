const fs = require('fs');

function openFile(path) {
    return new Promise((resolve, reject) => {
        fs.open(path, (err, fd) => {
            if (err) reject(err);
            else resolve(fd);
        })
    });
}

function closeFile(fd) {
    return new Promise((resolve, reject) => {
        fs.close(fd, (err) => {
            if (err) reject(err);
            else resolve(true);
        })
    });
}

function readOpenedFile(fd, position, length) {
    return new Promise((resolve, reject) => {
        const buff = Buffer.alloc(length);
        fs.read(fd, buff, 0, length, position, (err, bytes, buffer) => {
            if (err) reject(err);
            else resolve(buffer);
        })
    });
}

module.exports = {
    openFile,
    closeFile,
    readOpenedFile,
}
