
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
