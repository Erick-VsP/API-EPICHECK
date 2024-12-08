const Joi = require('joi');
const EPI = require('../models/epi');

const epiSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  tipo: Joi.string().min(3).max(100).required(),
  ca: Joi.string().min(3).max(50).required(),
  tamanho: Joi.string().optional(),
  marca: Joi.string().optional()
});

exports.getAllEPIs = async (req, res) => {
  try {
    const epis = await EPI.findAll();
    res.status(200).json(epis);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os EPIs', error });
  }
};

exports.getEPIById = async (req, res) => {
  const { id } = req.params;
  
  const idSchema = Joi.number().integer().required();
  const { error } = idSchema.validate(id);

  if (error) {
    return res.status(400).json({ message: 'ID inválido', details: error.details });
  }

  try {
    const epi = await EPI.findByPk(id);
    if (!epi) {
      return res.status(404).json({ message: 'EPI não encontrado' });
    }
    res.status(200).json(epi);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o EPI', error });
  }
};

exports.createEPI = async (req, res) => {
  const { error, value } = epiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Dados inválidos', details: error.details });
  }

  try {
    const novoEPI = await EPI.create(value);
    res.status(201).json(novoEPI);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o EPI', error });
  }
};

exports.updateEPI = async (req, res) => {
  const { id } = req.params;
  const { error, value } = epiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Dados inválidos', details: error.details });
  }

  try {
    const epi = await EPI.findByPk(id);
    if (!epi) {
      return res.status(404).json({ message: 'EPI não encontrado' });
    }

    await epi.update(value);
    res.status(200).json(epi);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o EPI', error });
  }
};

exports.deleteEPI = async (req, res) => {
  const { id } = req.params;

  const idSchema = Joi.number().integer().required();
  const { error } = idSchema.validate(id);

  if (error) {
    return res.status(400).json({ message: 'ID inválido', details: error.details });
  }

  try {
    const epi = await EPI.findByPk(id);
    if (!epi) {
      return res.status(404).json({ message: 'EPI não encontrado' });
    }
    await epi.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o EPI', error });
  }
};
