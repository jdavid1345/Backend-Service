import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Candy } from "../entities/Candy";

const CandyRepository = AppDataSource.getRepository(Candy);

// GET - Obtener Todos los Dulces
export const getAllCandy = async(red: Request, res: Response) => {
  try {
    const Candy = await CandyRepository.find();
    res.json(Candy);
  } catch(error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

// GET by ID - Obetener Dulce por ID
export const getCandyById = async(req: Request, res: Response) => {
  try {
    const Candy = await CandyRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Candy) {
      res.json(Candy);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al obtener el producto." });
  }
};

// POST - Crear un nuevo Dulce
export const createCandy = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const candy = new Candy();
    candy.name = name;
    candy.description = description;
    candy.price = price;

    await CandyRepository.save(candy);
    res.status(201).json(Candy);
  } catch(error) {
    res.status(500).json({ message: "Error al crear el producto." });
  }
};

// PUT - Actualizar un Dulce existente
export const updateCandy = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const Candy = await CandyRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Candy) {
      Candy.name = name ?? Candy.name;
      Candy.description = description ?? Candy.description;
      Candy.price = price ?? Candy.price;

      await CandyRepository.save(Candy);
      res.json(Candy);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

// DELETE - Borrar un Dulce
export const deleteCandy = async(req: Request, res: Response) => {
  try {
    const Candy = await CandyRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (Candy) {
      await CandyRepository.remove(Candy);
      res.json({ message: "Producto eliminado." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};