const searchInput = document.querySelector('#search-input');
const container = document.querySelector('#results-container');
const pages = document.querySelector('.pages');

let queryText = '';
let pageNumber = 0;
const pageSize = 12;

async function sendQuery(query, skip=0) {
    queryText = query;

    const res = await fetch('./search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            skip,
        })
    });

    return await res.json();
}

function renderResults(data) {
    const pageCount = Math.ceil(data.total / data.size);

    container.innerHTML = '';
    
    if (data.results.length === 0) {
        const message = document.createElement('p');
        message.classList = 'message';
        if (queryText == '') {
            message.textContent = 'type somthing to start ...';
        } else {
            message.textContent = `no results for "${queryText}"`;
        }
        container.appendChild(message);
    } else {
        for (const course of data.results) {
            const card = createCard(course);
            container.appendChild(card);
        }
        for (let i=0; i<6; i++) {
            container.appendChild( document.createElement('br') )
        }
    }

    

    pages.innerHTML = '';
    pages.appendChild( createPagesCount(data.total) );
    pages.appendChild( createPagesList(pageCount, pageNumber) );
}

async function onSearchInput(event) {
    const {value} = event.target;
    pageNumber = 0;

    const data = await sendQuery(value, 0);
    if (queryText === data.query) {
        renderResults(data);
    }
    
}

async function onPageSelect() {
    const page = parseInt(this.pageNumber);
    console.log({page, pageNumber})

    if (page !== pageNumber && queryText !== '') {
        pageNumber = page;
        const data = await sendQuery(queryText, page * pageSize);
        if (queryText === data.query) {
            renderResults(data);
        }
    }
}

searchInput.oninput = onSearchInput;
