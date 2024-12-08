const express = require('express');
const app = express();
const epiRoutes = require('./routes/epiRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./config/swagger');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/epicheck', epiRoutes, authMiddleware); //Protegendo as rotas de EPIs 

// Configuração do swagger
setupSwagger(app)

// Middleware para tratamento de erros
app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.log('Erro ao conectar ao banco: ' + err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});