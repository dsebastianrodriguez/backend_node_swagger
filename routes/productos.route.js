const router = require("express").Router();
const respuesta = require('../red/respuestas');
const clientes = require('../database/index.productos');

/**
 * @swagger
 * /api/productos:
 *   get:
 *     tags: [Products]
 *     description: Get all products
 *     responses:
 *       200:
 *         description: list of products
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     tags: [Products]
 *     description: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: product details
 */
router.get('/:id',  getOne);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     tags: [Products]
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: product deleted
 */
router.delete('/:id', deploy);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     tags: [Products]
 *     description: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cantidad:
 *                 type: string
 *               activado:
 *                 type: string
 *           example: 
 *             nombre: "Destornillador"
 *             cantidad: "43"
 *             activado: "1"
 *     responses:
 *       200:
 *         description: product created
 */
router.post('/', create);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     tags: [Products]
 *     description: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
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
 *               cantidad:
 *                 type: string
 *               activado:
 *                 type: string
 *           example:
 *             nombre: "Cincel"
 *             cantidad: "25"
 *             activado: "1"
 *     responses:
 *       200:
 *         description: customer updated
 */
router.put('/', update);

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
        const data = await clientes.update(req.body);
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