import {
  Optional,
  Sequelize,
  DataTypes,
  QueryInterface,
  Association
} from "sequelize";
import {BaseModel} from "../utils";
import User from "./User.model";
import {Schemas} from "../keys/apidoc";

export interface CalonAttributes {
  id : number;
  name : string;
  suaraIds? : Array<number>;
  suara : number;
}

export type CalonCreationAttributes = Optional<CalonAttributes,"id">

export class Calon extends BaseModel<CalonAttributes,CalonCreationAttributes>
  implements CalonAttributes {
    public static readonly tableName = "MT_Calon";
	  public static readonly modelName = "Calon";
	  public static readonly modelNamePlural = "Calons";
    public static readonly defaultScope = {};
    id : number;
    name : string;
    suaraIds? : Array<number>;
    suara : number;
    public readonly createdAt!: Date;
	  public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    

    public static associations: {
      userVoter : Association<Calon,User>
    };

    public static setAssociation(): void {
        this.hasMany(User, {
          foreignKey : "id",
          as : "voter"
        })
     }
    
    public static modelInit(sequlize: Sequelize) : void {
        this.init(
          {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name : DataTypes.STRING,
          suaraIds : new DataTypes.ARRAY(DataTypes.INTEGER()),
          suara : DataTypes.INTEGER,
        },
        {
          sequelize: sequlize,
          tableName: this.tableName,
          name: {
            singular: this.modelName,
            plural: this.modelNamePlural,
          },
          defaultScope: this.defaultScope,
          comment: "Model for the accessible data of Line",
          paranoid: true
        }
      );
    }

    public static createTable(query: QueryInterface): Promise<void>{
        return query.createTable(this.tableName, {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          name : {
            type: DataTypes.STRING,
            allowNull: false,
          },
          suaraIds: new DataTypes.ARRAY(DataTypes.INTEGER()),
          suara : {
            type : DataTypes.INTEGER,
            allowNull : true
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

  export const swaggerSchemas :Schemas[]= [
    {
      NewCalon : {
        title : "",
        properties: {
          name : {
            type : "string",
          },
        }
      },
      Calon : {
        title : "",
        properties : {
          id : {
            type : "number"
          },
          name : {
            type : "string"
          },
          suara : {
            type : "number"
          }
        }
      }
    }
  ];

export default Calon;

