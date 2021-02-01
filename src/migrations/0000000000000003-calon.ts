import { QueryInterface } from "sequelize";
import Calon from "../models/Calon.model";

export const up = async (query: QueryInterface): Promise<void> => {
	try {
		return Calon.createTable(query);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface): Promise<void> => {
	try {
		return Calon.dropTable(query);
	} catch (error) {
		return Promise.reject(error);
	}
};
