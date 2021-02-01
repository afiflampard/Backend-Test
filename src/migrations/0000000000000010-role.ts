import { QueryInterface } from "sequelize";
import Role from "../models/Role.model";

export const up = async (query: QueryInterface): Promise<void> => {
	try {
		return Role.createTable(query);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const down = async (query: QueryInterface): Promise<void> => {
	try {
		return Role.dropTable(query);
	} catch (error) {
		return Promise.reject(error);
	}
};
