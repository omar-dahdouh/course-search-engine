const searchInput = document.querySelector('#search-input')
const container = document.querySelector('#results-container');

const icons = [
    'icons/udemy.png',
    'icons/coursera.png',
    'icons/edx.jpg',
    'icons/alison.jpg',
    'icons/futurelearn.png',
]
const images = [
    (url) => `https://img-b.udemycdn.com/course/240x135/${url}`,
    (url) => `https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/`
        + `https://coursera-course-photos.s3.amazonaws.com${url}`
        + `?auto=format%2Ccompress&dpr=1&w=150&h=150&fit=fill&bg=FFF&q=25`,
    (url) => `https://prod-discovery.edx-cdn.org/media/course/image/${url}`,
    (url) => `https://cdn01.alison-static.net/courses/${url}`,
    (url) => `https://ugc.futurelearn.com/uploads/images/${url}`,
]

const links = [
    (url) => `https://www.udemy.com/course/${url}`,
    (url) => `https://www.coursera.org/learn/${url}`,
    (url) => `https://www.edx.org/course/${url}`,
    (url) => `https://alison.com/courses/${url}`,
    (url) => `https://www.futurelearn.com/courses/${url}`,
]


function createCard(course) {
    // <div class="card">
    //     <div class="card-image"></div>
    //     <div class="card-content">
    //         <a class="card-title" href="#">MongoDb With .Net Core-Sagar Jaybhay</a>
    //         <p class="card-source">
    //             <img class="card-source-icon" src="icons/alison.png">
    //             <span class="card-source-url">https://www.udemy.com/course/mongodb-with-net-core-sagar-jaybhay</span>
    //         </p>
    //         <p class="card-description">MongoDB is a distributed Database at its core, so high availability, horizontal scaling, and geographic distribution are built in and easy to use. This training will help you master the leading document-oriented NoSQL database.This course i have created f...</p>
    //     </div>
    // </div>

    const image = document.createElement('div');
    image.className = 'card-image';
    image.style.backgroundImage = `url(${images[course.src](course.image)})`;

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

async function onSearchInput(event) {
    const {value} = event.target;
    console.log({value});

    const res = await fetch(`./search/${value}`);
    const data = await res.json();

    container.innerHTML = '';
    for (const course of data.results) {
        const card = createCard(course);
        container.appendChild(card);
    }

    for (let i=0; i<6; i++) {
        container.appendChild( document.createElement('br') )
    }
}

searchInput.oninput = onSearchInput;

// console.log(searchInput)
// console.log(container)