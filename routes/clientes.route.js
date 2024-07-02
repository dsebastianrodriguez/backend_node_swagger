const router = require("express").Router();
const respuesta = require('../red/respuestas');
const clientes = require('../database/index.clientes');

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     tags: [Customers]
 *     description: Get all customers
 *     responses:
 *       200:
 *         description: list of customers
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     tags: [Customers]
 *     description: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: customer details
 */
router.get('/:id',  getOne);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     tags: [Customers]
 *     description: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: customer deleted
 */
router.delete('/:id', deploy);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     tags: [Customers]
 *     description: Create a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: string
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *               direccion:
 *                 type: string
 *               activado:
 *                 type: string
 *           example: 
 *             nombre: "Joe Zoe"
 *             edad: "43"
 *             usuario: "joedoe"
 *             password: "password"
 *             direccion: "Av 65 #21 07 Niquía"
 *             activado: "1"
 *     responses:
 *       200:
 *         description: customer created
 */
router.post('/', create);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     tags: [Customers]
 *     description: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: string
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *               direccion:
 *                 type: string
 *               activado:
 *                 type: string
 *           example:
 *             nombre: "Jane Doe"
 *             edad: "25"
 *             usuario: "janedoe"
 *             password: "newpassword"
 *             direccion: "Av 100 #30-50 Medellin"
 *             activado: "1"
 *     responses:
 *       200:
 *         description: customer updated
 */
router.put('/:id', update);

async function getAll(req, res, next){
    try{
        const data = await clientes.getAll();
        respuesta.success(req, res, data, 200); 
    }catch(err){
        next(err);
    }
     
};

async function getOne(req, res, next){
    try{
        const data = await clientes.getOne(req.params.id);
        respuesta.success(req, res, data, 200);  
    }catch(err){
        next(err);
    }
    
};

async function create(req, res, next){
    try{
        const data = await clientes.create(req.body);
        // if(req.body.id == 0){
            // messagge = 'Created item succesfull';
        // }else{
            // messagge = 'Updated item succesfull';
        // }
        messagge = 'Created item succesfull';
        respuesta.success(req, res, messagge, 201);  
    }catch(err){
        next(err);
    }
    
};

async function update(req, res, next){
    try{
        const data = await clientes.update(req.params.id, req.body);
        messagge = 'Updated item succesfull';
        respuesta.success(req, res, messagge, 201);  
    }catch(err){
        next(err);
    }
    
};

async function deploy(req, res, next){
    try{
        
        const data = await clientes.deploy(req.params.id);
        respuesta.success(req, res, 'Item delete succesfully', 200);  
    }catch(err){
        next(err);
    }
    
};

module.exports = router;