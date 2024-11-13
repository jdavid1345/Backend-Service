import "reflect-metadata";
import { DataSource } from "typeorm";
import { Candy } from "./entities/Candy";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Candy],
  migrations:[],
  subscribers:[]
});