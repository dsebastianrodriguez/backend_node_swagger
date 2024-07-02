const app = require('./app');
const { swaggerDocs: V1SwaggerDocs } = require('../swagger');

app.listen(app.get('port'), () => {
    console.log("Servidor en puerto", app.get("port"));
    V1SwaggerDocs(app, app.get("port"));
})