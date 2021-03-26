const app = require('./app');

app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log('server started http://localhost:' + app.get('port'))
})
