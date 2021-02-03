import {Controller, Get, Put, Post, Delete, Patch} from "../decorators";
import {Request, response, Response} from "express";
import {auth} from "../middleware/auth";
import Calon from "../models/Calon.model";
import { successResponse, errorResponse } from "../utils";
import {_Request} from "../interfaces";
import ErrorLog from "../interfaces/ErrorLog.interface";
import User from "../models/User.model";
import Role from "../models/Role.model";

@Controller("/calon")
export default class CalonController {
  @Post({path:"/"},
  {
    responses: [
      {
        200: {
          description : "Response post object",
          responseType: "object",
          schema : "Calon"
        },
      }
    ],
    request : "NewCalon"
  },
  [auth]
  )
public async create(req : _Request, res: Response): Promise<Response>{

  const id : number= req.user.id;
  const {name} = req.body
  const user = await User.findOne({
    where : {
      id
    }
  })

  let calon : Calon
  if (user.roleId == 1){
    calon = await Calon.create({
      name,
      suara : 0,
    });
  }else{
    return errorResponse({res, msg : `User with id ${id} not allowed`,statusCode:404});
  }

  return successResponse({res, data:calon});
}
 @Get({path: "/"}, 
 {
   responses : [
     {
       200 : {
         description : "Response get Object",
         responseType: "array",
         schema: "Calon"
       }
     }
   ]
 },
 [auth]
 )
 public async getCalons(req: Request, res : Response): Promise<Response>{
   const calons = await Calon.findAll()
   if (!calons){
     return errorResponse({res, msg: `Calon not Found`, statusCode:404})
   }
   return successResponse({res, data : calons})
 }
 @Put({path:"/vote/:id"},
 {
   responses : [
     {
       200: {
         description: "Response put object",
         responseType: "object",
         schema : "NewCalon"
       }
     }
   ],
   parameters : [
     {
       in: "query",
       schema : {
         type : "number"
       },
       name : "Idchoice"
     },
     {
       name : "id",
       in : "path",
       schema : {
         type : "number",
       },
       required : true
     }
   ]
 },[auth])

 public async updateVote(req: _Request, res:Response):Promise<Response>{
   const {id} = req.params
   const {Idchoice} = req.query

   try{
     const user = await User.findOne({
       where : {
         id
       },
     });
     if(!user){
       return errorResponse({res, msg: `User with ${id} not found`,statusCode:404});
     }
     if (!user.isChoice){
      let suara :number
       let array = []
       let calon = await Calon.findOne({
         where : {
           id : Idchoice
         }
       })
      if(calon.suaraIds != null){
        if(calon.suaraIds.includes(user.id)){
          return errorResponse({res, msg : `User with id ${id} already choice`, statusCode:400})
        }else{
          array.push(user.id)
          suara = calon.suara+1
        }
      }else{
        array.push(user.id)
        suara = calon.suara+1
      }
      await user.update({
        isChoice : true
      })
      await calon.update({
        suaraIds : array,
        suara : suara
      })
      return successResponse({res, msg: `Calon with id ${calon.id} sudah ditambahkan`})
     }else{
       return errorResponse({res, msg:`User with id ${user.id} already choice`, statusCode:401})
     }

     
   }catch(e){
     const err: ErrorLog = e
     return errorResponse({res, msg: err.message, statusCode:err.code|500});
   }
  
 }

 @Put({path:"/:id"},
 {
   responses : [
     {
       200: {
         description: "Response put object",
         responseType: "object",
         schema: "NewCalon"
       }
     }
   ],
   parameters: [
     {
      name : "idCalon",
      in : "query",
      schema : {
        type : "number"
      }
     },
     {
      name : "id",
       in : "path",
       schema:{
         type : "number"
       },
       required: true
     }
   ],
   request : "NewCalon"
 },[auth])
 public async updateCalon(req:_Request, res:Response):Promise<Response>{
  const {id} = req.params
  const {idCalon} = req.query
  const {name} = req.body  
  if(!name){
    errorResponse({res, msg :`Name must have writing`, statusCode:400})
  }
  try {
    const user = await User.findOne({
      where : {
        id
      },
      include : [
        {
          attributes: ["id","name"],
          association: User.associations.role,
          as: "role"
        }
      ]
    })

    const calon = await Calon.findOne({
      where : {
        id : idCalon
      }
    })

    if(user.role.name == "Staff"){
       calon.update({
         name : name
       })
    }
    return successResponse({res, msg: `Calon with ${idCalon} sudah diupdate`})
  }catch(e){
    const err : ErrorLog = e
    return errorResponse({res, msg: err.message, statusCode:500})
  }
 }
}