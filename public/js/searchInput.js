const searchInput = document.querySelector('#search-input');

let queryText = '';
let suggestions = [];
let suggestSelected = 0;

function setSuggestions(list) {
    suggestions = list;
    suggestSelected = 0;
    renderSuggestions(suggestions);
}

async function getSuggestions(query) {
    const word = query.split(' ').pop();
    if (word) {
        const data = await postFetch('./suggest', { query });
        if (data.query === queryText) {
            setSuggestions(data.results);
        }
    } else {
        setSuggestions([]);
    }
}

async function getResults(query, skip=0) {
    queryText = query;

    const data = await postFetch('./search', { query, skip });
    
    if (queryText === data.query) {
        renderResults(data);
    }

    return data;
}

searchInput.oninput = async (event) => {
    const {value} = event.target;
    pageNumber = 0;

    getSuggestions(value);
    getResults(value, 0);

}

searchInput.onkeydown = (event) => {
    let {code} = event;

    let val = suggestSelected;
    let len = suggestions.length;

    if (code === 'ArrowDown') {
        event.preventDefault();
        suggestSelected = (val+1) % len;
        renderSuggestions(suggestions, suggestSelected);
    }
    else if (code === 'ArrowUp') {
        event.preventDefault();
        suggestSelected = (val+len-1) % len;
        renderSuggestions(suggestions, suggestSelected);
    }
    else if (code === 'Enter') {
        event.preventDefault();
        selectSuggestion(suggestSelected)
    }
}

searchInput.onfocus = () => {
    if (suggestions.length > 0) {
        suggestionsContainer.style.display = 'block';
    }
}

searchInput.onblur = () => {
    suggestionsContainer.style.display = 'none';
}

function onSuggestionClick() {
    selectSuggestion(this.itemIndex)
}

function selectSuggestion(index) {
    let words = searchInput.value.split(' ').slice(0, -1);
    words.push(suggestions[index][0]);
    let query = words.join(' ') + ' ';
    searchInput.value = query;
    setSuggestions([]);
    getResults(query);
}