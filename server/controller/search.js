const { getDocs } = require('./document');
const { getCourse } = require('./course');

function docFind(list, docID) {
    let pos = 0;
    while (pos < list.length) {
        if (list[pos][0] === docID) {
            return list[pos];
        } else {
            pos = (pos<<1) + (list[pos][0] < docID ? 2 : 1);
        }
    }
}

function docIntersect(arr) {
    let lists = arr.sort((a,b) => a.length-b.length);
    let list = lists[0] || [];

    for (let i=1; i<lists.length; i++) {
        list = list.filter(([docID]) => docFind(lists[i], docID));
    }
    return list;
}

function parseWords(text) {
    return text.toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, ' ')
        .trim().split(/\s+/);
}

async function search(req, res) {
    const words = parseWords(req.params.words)
    
    const lists = [];
    for (const word of words) {
        lists.push(await getDocs(word))
    }

    const docs = docIntersect(lists)
        .sort((a,b) => b[1]-a[1]);
    
    const results = [];
    for (const [docID] of docs.slice(0, 20)) {
        results.push(await getCourse(docID));
    }

    res.json({
        results,
        total: docs.length,
    });
}

module.exports = {
    search,
};
