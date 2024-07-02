const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Customers API NODEJS", version: "1.0.0"},
    },
    apis: ["routes/clientes.route.js","routes/productos.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app, port) => {
    app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req,res)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);

    });

    console.log(`Version 1 docs are available at http://localhost:${port}/api/docs`);
}

module.exports = { swaggerDocs };