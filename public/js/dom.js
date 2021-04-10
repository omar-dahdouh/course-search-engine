function createCard(course) {
    const imageDate = document.createElement('span');
    imageDate.className = 'card-image-date'; 
    imageDate.textContent = new Date(course.date).toLocaleDateString();

    const image = document.createElement('div');
    image.className = 'card-image';
    image.style.backgroundImage = `url(${images[course.src](course.image)})`;
    image.appendChild(imageDate);
  
    const title = document.createElement('a');
    title.className = 'card-title';
    title.href = links[course.src](course.url);
    title.textContent = course.title;

    const sourceIcon = document.createElement('img');
    sourceIcon.className = 'card-source-icon';
    sourceIcon.src = icons[course.src];

    const sourcUrl = document.createElement('span');
    sourcUrl.className = 'card-source-url';
    sourcUrl.textContent = links[course.src](course.url);

    const source = document.createElement('div');
    source.className = 'card-source';
    source.appendChild(sourceIcon);
    source.appendChild(sourcUrl);

    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = course.description + ' ...';

    const content = document.createElement('div');
    content.className = 'card-content';
    content.appendChild(title);
    content.appendChild(source);
    content.appendChild(description);

    const card = document.createElement('div');
    card.className = 'card';
    card.appendChild(image);
    card.appendChild(content);

    return card;
}

function createPagesCount(number) {
    const pagesCountNumber = document.createElement('span');
    pagesCountNumber.className = 'pages-count-number';
    pagesCountNumber.textContent = number;

    const pagesCount = document.createElement('div');
    pagesCount.className = 'pages-count';
    pagesCount.textContent = 'results';
    pagesCount.prepend(pagesCountNumber);

    return pagesCount;
}

function createPagesList(count, selected=0) {
    const pagesList = document.createElement('div');
    pagesList.className = 'pages-list';

    for (let i=0; i<count; i++) {
        let pagesListItem = document.createElement('div');
        pagesListItem.classList = 'pages-list-item';
        pagesListItem.textContent = `${i+1}`;
        pagesListItem.pageNumber = i;
        pagesListItem.onclick = onPageSelect;

        if (i === selected) {
            pagesListItem.classList.add('selected');
        }
        pagesList.appendChild(pagesListItem);
    }

    return pagesList;
}