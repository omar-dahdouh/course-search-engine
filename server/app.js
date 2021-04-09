const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const routes = require('./router');

app.set('port', process.env.PORT || 5000);
app.disabled('x-powered-by');

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

app.use(routes);

app.use((req, res) => {
    res.status(404).json({
        message: 'page not found!',
    });
})

app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'somthing went wrong!'
    })
})

module.exports = app;
