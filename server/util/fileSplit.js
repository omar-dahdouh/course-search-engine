const { join} = require('path');
const fs = require('fs');

async function fileSplit(name) {
    const filePath = join(__dirname, '..', 'data', `${name}.bin`);
    const buffer = fs.readFileSync(filePath);
    
    const partSize = 10000000;
    let index = 0;

    for (let i=0; i<buffer.length; i+=partSize) {
        const path = join(__dirname, '..', 'parts', `${name}-${index++}.bin`);
        fs.writeFileSync(path, buffer.slice(i, i+partSize))
    }
}

async function fileJoin(name) {
    let index = 0;
    const filePath = join(__dirname, '..', 'data', `${name}.bin`);
    let path = join(__dirname, '..', 'parts', `${name}-${index++}.bin`);

    while(fs.existsSync(path)) {
        const buffer = fs.readFileSync(path);
        fs.appendFileSync(filePath, buffer);

        path = join(__dirname, '..', 'parts', `${name}-${index++}.bin`);
    }
}

module.exports = {
    fileSplit,
    fileJoin,
}
