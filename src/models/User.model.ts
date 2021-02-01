import {
	Optional,
	Sequelize,
	DataTypes,
	QueryInterface,
	Association,
	TinyIntegerDataType,
} from "sequelize";
import { BaseModel } from "../utils";

import { Schemas } from "../keys/apidoc";
import Role from "./Role.model";

export interface UserAttributes {
	id: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	roleId: number;
	isChoice: Boolean;
	lastLoginAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends BaseModel<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	public static readonly tableName = "MT_User";
	public static readonly modelName = "User";
	public static readonly modelNamePlural = "Users";
	public static readonly defaultScope = {};
	public id!: number;
	public username!: string;
	public password!: string;
	public firstName!: string;
	public lastName!: string;
	public avatarUrl!: string;
	public roleId!: number;
	public lastLoginAt?: Date;
	public role?: Role;
	public isChoice:Boolean;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;

	public static associations: {
		role: Association<User, Role>,
	};

	public static setAssociation(): void {
		this.belongsTo(Role, { foreignKey: "roleId", as: "role" });
	}


	public static modelInit(sequlize: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				username: {
					type: new DataTypes.STRING(),
				},
				password: new DataTypes.STRING(),
				firstName: new DataTypes.STRING(),
				lastName: new DataTypes.STRING(),
				avatarUrl: new DataTypes.STRING(),
				roleId: new DataTypes.INTEGER(),
				isChoice : DataTypes.BOOLEAN,
				// tempAreaId: new DataTypes.INTEGER(),
				lastLoginAt: new DataTypes.DATE()
			},
			{
				sequelize: sequlize,
				tableName: this.tableName,
				name: {
					singular: this.modelName,
					plural: this.modelNamePlural,
				},
				defaultScope: this.defaultScope,
				comment: "Model for the accessible data of user",
				paranoid: true
			}
		);
	}

	public static createTable(query: QueryInterface): Promise<void> {
		return query.createTable(this.tableName, {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
			},
			lastName: {
				type: DataTypes.STRING
			},
			avatarUrl: DataTypes.STRING,
			roleId: DataTypes.INTEGER,
			isChoice: DataTypes.BOOLEAN,
			lastLoginAt: {
				type: DataTypes.DATE,
			},
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
		});
	}

	public static dropTable(query: QueryInterface): Promise<void> {
		return query.dropTable(this.tableName);
	}
}

export const swaggerSchemas: Schemas[] = [
	{
		User: {
			title: "",
			properties: {
				id: {
					type: "number",
				},
				username: {
					type: "string",
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				avatarUrl: {
					type: "string"
				},
				isChoice : {
					type : "boolean"
				},
				lastLoginAt: {
					type: "string",
				},
			},
		},
		NewUser: {
			title: "",
			properties: {
				username: {
					type: "string",
				},
				password: {
					type: "string"
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				avatarUrl: {
					type: "string"
				},
				roleId: {
					type: "number",
				}
			},
		},
		UpdateUser: {
			title: "",
			properties: {
				username: {
					type: "string",
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				avatarUrl: {
					type: "string"
				},
				lineId: {
					type: "number",
				},
				areaId: {
					type: "number",
				},
				stepId: {
					type: "number",
				},
				roleId: {
					type: "number",
				},
				groupId: {
					type: "number",
				},
			},
		},
	}
];

export default User;
