import { QueryInterface } from "sequelize";
import { hash, genSalt } from "bcryptjs";
import User from "../models/User.model";
import Role from "../models/Role.model";
import { sequelize_postgres } from "../utils/dbConnection";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
	// disable sequelize logging
	sequelize_postgres.options.logging = false;
	// init model
	Role.modelInit(sequelize_postgres);

	try {
		const [
			Staff,
			Voter
		] = await Role.findAll({
			where: {
				name: [
					"Staff",
					"Voter",
				]
			}
		});
		
		
		const password = await hash("password", await genSalt(12));
		const now = new Date();
		const users = await query.bulkInsert(User.tableName, [
			// admin
			{
				username: "12345",
				password,
				firstName: "Staff",
				lastName: "Staf",
				roleId: Staff.id,
				isChoice: false,
				createdAt: now,
				updatedAt: now,
			},

			{
				username: "12344",
				password,
				firstName: "Voter",
				lastName: "vot",
				isChoice : false,
				roleId: Voter.id,
				createdAt: now,
				updatedAt: now,
			},
			
		]);
		return Promise.resolve(users);
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
