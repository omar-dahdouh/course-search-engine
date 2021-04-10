const { getDocs } = require('./document');
const { getCourse } = require('./course');
const { searchValidation } = require('./validation');

// binary search tree
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
        list = list.filter(doc => {
            let fff = docFind(lists[i], doc[0]);
            if (fff) {
                doc[1] += fff[1];
                return true;
            }
            return false;
        });
    }
    return list;
}

async function search(req, res) {
    const originalQuery = req.body.query;
    const {query, skip} = searchValidation(req.body);

    const words = query;
    const size = 12;
    
    const lists = [];
    for (const word of words) {
        lists.push(await getDocs(word))
    }

    const docs = docIntersect(lists)
        .sort((a,b) => b[1]-a[1]);
    
    const results = [];
    for (const [docID] of docs.slice(skip, skip+size)) {
        results.push(await getCourse(docID));
    }

    res.json({
        results,
        total: docs.length,
        query: originalQuery,
        skip,
        size,
    });
}

module.exports = {
    search,
};
