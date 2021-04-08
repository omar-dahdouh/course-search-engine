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

async function search(req, res) {
    const words = req.params.words.split(' ');
    
    const lists = [];
    for (const word of words) {
        lists.push(await getDocs(word))
    }

    const docs = docIntersect(lists)
        .map(([id, pos]) => [id, pos, pos.length/pos[0]])
        .sort((a,b) => b[2]-a[2]);
    
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
