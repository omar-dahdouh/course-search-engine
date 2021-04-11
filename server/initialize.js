const fs = require('fs');
const { join } = require('path');
const { openFile } = require('./util/file');
const { fileJoin } = require('./util/fileSplit');

const dataPath = join(__dirname, 'data', 'dataBuffer.bin');
const indexPath = join(__dirname, 'data', 'indexBuffer.bin');
const wordPath = join(__dirname, 'data', 'wordBuffer.bin');
const docPath = join(__dirname, 'data', 'docBuffer.bin');
const posPath = join(__dirname, 'data', 'posBuffer.bin');
const suggPath = join(__dirname, 'data', 'suggestions.bin');

async function initialize() {
    if (!fs.existsSync(dataPath)) {
        await fileJoin('dataBuffer')
    }
    if (!fs.existsSync(docPath)) {
        await fileJoin('docBuffer')
    }
    if (!fs.existsSync(posPath)) {
        await fileJoin('posBuffer')
    }

    global.myVars = {
        dataBuffer: await openFile(dataPath),
        indexBuffer: await fs.promises.readFile(indexPath),
        docBuffer: await openFile(docPath),
        posBuffer: await openFile(posPath),
        wordBuffer: await fs.promises.readFile(wordPath),
        suggBuffer: await fs.promises.readFile(suggPath),
    }
}

module.exports = initialize;
