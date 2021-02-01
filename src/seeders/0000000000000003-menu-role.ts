import { QueryInterface } from "sequelize";
import { sequelize_postgres } from "../utils/dbConnection";
import { Role } from "../models/Role.model";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
	// disable sequelize logging
	sequelize_postgres.options.logging = false;
	// init model
	Role.modelInit(sequelize_postgres);
	const roleKeys = [
		"Staff",
		"Voter"
	]

	try {

		for (const role of roleKeys) {
			await Role.create({
				name: role,
			});
		}
		return Promise.resolve(1);
	} catch (error) {
		return Promise.reject(error);
	}
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const down = async (query: QueryInterface): Promise<object | number> => {
	try {

	} catch (error) {
		return Promise.reject(error);
	}
};
