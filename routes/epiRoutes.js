// routes/epiRoutes.js
const express = require('express');
const router = express.Router();
const epiController = require('../controllers/epiController');

/**
 * @swagger
 * components:
 *   schemas:
 *     EPI:
 *       type: object
 *       required:
 *         - nome
 *         - tipo
 *         - ca
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do EPI
 *         nome:
 *           type: string
 *           description: Nome do EPI
 *         tipo:
 *           type: string
 *           description: Tipo do EPI
 *         ca:
 *           type: string
 *           description: CA do EPI
 *         tamanho:
 *           type: string
 *           description: Tamanho do EPI
 *         marca:
 *           type: string
 *           description: Marca do EPI
 *       example:
 *         id: 1
 *         nome: Capacete de Segurança
 *         tipo: Cabeça
 *         ca: 12345
 *         tamanho: M
 *         marca: XYZ
 */

/**
 * @swagger
 * tags:
 *   name: EPIs
 *   description: Gestão de EPIs
 */

/**
 * @swagger
 * /epis:
 *   get:
 *     summary: Retorna a lista de todos os EPIs
 *     tags: [EPIs]
 *     responses:
 *       200:
 *         description: A lista de EPIs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EPI'
 */
router.get('/epis', epiController.getAllEPIs);

/**
 * @swagger
 * /epis/{id}:
 *   get:
 *     summary: Retorna um EPI pelo ID
 *     tags: [EPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do EPI
 *     responses:
 *       200:
 *         description: O EPI pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EPI'
 *       404:
 *         description: EPI não encontrado
 */
router.get('/epis/:id', epiController.getEPIById);

/**
 * @swagger
 * /epis:
 *   post:
 *     summary: Cria um novo EPI
 *     tags: [EPIs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EPI'
 *     responses:
 *       201:
 *         description: EPI criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EPI'
 *       400:
 *         description: Dados inválidos
 */
router.post('/epis', epiController.createEPI);

/**
 * @swagger
 * /epis/{id}:
 *   put:
 *     summary: Atualiza um EPI pelo ID
 *     tags: [EPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do EPI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EPI'
 *     responses:
 *       200:
 *         description: EPI atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EPI'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: EPI não encontrado
 */
router.put('/epis/:id', epiController.updateEPI);

/**
 * @swagger
 * /epis/{id}:
 *   delete:
 *     summary: Deleta um EPI pelo ID
 *     tags: [EPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do EPI
 *     responses:
 *       204:
 *         description: EPI deletado com sucesso
 *       404:
 *         description: EPI não encontrado
 */
router.delete('/epis/:id', epiController.deleteEPI);

module.exports = router;
