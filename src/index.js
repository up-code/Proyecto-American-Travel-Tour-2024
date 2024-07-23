const app = require('./app');

app.listen(app.get('port'), ()=> {
    console.log('Server Runing in Port...', app.get('port'));
});