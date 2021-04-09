// remove symbols and split words
function parseWords(text) {
    return text.toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, ' ')
        .trim().split(/\s+/);
}

// remove repeated words
function uniqueWords(words) {
    let results = [];
    for (const word of words) {
        if (!results.includes(word)) {
            results.push(word);
        }
    }
    return results;
}

function searchValidation(params) {
    let {query, skip} = params;
    if (typeof query !== 'string') {
        query = '';
    }
    if (!Number.isInteger(skip)) {
        skip = 0;
    }

    return {
        query: uniqueWords( parseWords(query) ),
        skip: skip,
    }
}

module.exports = {
    searchValidation,
}
