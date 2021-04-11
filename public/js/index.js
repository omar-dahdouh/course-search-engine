// const searchInput = document.querySelector('#search-input');
const pages = document.querySelector('.pages');

// let queryText = '';
let pageNumber = 0;
const pageSize = 12;
// let suggestions = [];

async function postFetch(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function onPageSelect() {
    const page = parseInt(this.pageNumber);
    console.log({page, pageNumber})

    if (page !== pageNumber && queryText !== '') {
        pageNumber = page;
        const data = await getResults(queryText, page * pageSize);
    }
}

