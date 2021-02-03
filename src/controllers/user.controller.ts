import { Controller, Get, Put, Post, Delete, Patch } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { genSalt, hash, compare } from "bcryptjs";
import User from "../models/User.model";
import { successResponse, errorResponse } from "../utils";
import { _Request } from "../interfaces";
import ErrorLog from "../interfaces/ErrorLog.interface";
import Role from "../models/Role.model";

@Controller("/users")
export default class UserController {
    @Post({ path: "/" },
        {
            responses: [
                {
                    200: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "User"
                    },
                }
            ],
            request: "NewUser"
        },
        [auth]
    )
    public async create(req: _Request, res: Response): Promise<Response> {
        const {
            username,
            password,
            firstName,
            lastName,
            roleId,
        } = req.body;
        try {
            if (!req.body.username || !req.body.password) {
                throw "username and password is required";
            }
            const currentUser = await User.findOne({
                where: {
                    username
                }
            });

            if (currentUser) throw "user exist";

            const salt = await genSalt(12);
            const hashPassword = await hash(password, salt);
            let user: User;
            if (req.user.role.name == "Staff") {
                user = await User.create({
                    firstName,
                    lastName,
                    username,
                    password: hashPassword,
                    roleId,
                    isChoice:false,
                    avatarUrl: "",
                });
            }

            if (!user) throw "cant create user";

            return successResponse({ res, data: user });
        } catch (e) {
            return res.status(500).json({
                sucess: false,
                message: e
            });
        }
    }
    @Get({ path: "/" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "array",
                        schema: "User"
                    }
                }
            ]
        })
    public async getUsers(req: Request, res: Response): Promise<Response> {
        const users = await User.findAll({
            attributes: {
                exclude: ["password"],
            },
            include: [  
                {
                    attributes: ["id", "name"],
                    association: User.associations.role,
                    as: "role"
                },
            ]
        });

        return successResponse({ res, data: users });
    }

    @Get({ path: "/:id" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "object",
                        schema: "User"
                    }
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    schema: {
                        id: {
                            type: "number"
                        }
                    },
                    required: true
                }
            ]
        })
    public async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["password"]
            }
        });

        if (!user) return errorResponse({ res, msg: `User with id ${id} not found`, statusCode: 404 });

        return successResponse({ res, data: user });
    }

    @Put({ path: "/:id" },
        {
            responses: [
                {
                    200: {
                        description: "Response put object",
                        responseType: "object",
                        schema: "User"
                    }
                }
            ],
            request: "UpdateUser",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        type: "number",
                    },
                    required: true
                }
            ]
        },
        [auth])
    public async update(req: _Request, res: Response): Promise<Response> {
        const {
            firstName,
            lastName,
            roleId,
            avatarUrl,
        } = req.body;

        const { id } = req.params;

        try {
            const user = await User.findOne({
                where: {
                    id
                },
                include: [
                    {
                        association: User.associations.role
                    }
                ]
            });

            if (!user) throw { code: 404, message: `User with id ${id} not found` };

            if (user.role.name == "Staff") {
                await user.update({
                    firstName: firstName ?? user.firstName,
                    lastName: lastName ?? user.lastName,
                    roleId: roleId ?? user.roleId,
                    avatarUrl: avatarUrl ?? user.avatarUrl,
                });
            } else {
                await user.update({
                    firstName: firstName ?? user.firstName,
                    lastName: lastName ?? user.lastName,
                    roleId: roleId ?? user.roleId,
                    avatarUrl: avatarUrl ?? user.avatarUrl,
                });
            }

            return successResponse({ res, msg: `User with id ${id} successfully updated` });

        } catch (e) {
            console.error(e);
            const err: ErrorLog = e;
            return errorResponse({ res, msg: err.message, statusCode: err.code | 500 });
        }
    }

    @Patch({ path: "/:id" },
        {
            responses: [
                {
                    200: {
                        description: "Response put object",
                        responseType: "object",
                        schema: {
                            properties: {
                                success: {
                                    type: "boolean"
                                },
                                msg: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            ],
            request: {
                type: "object",
                properties: {
                    oldPassword: {
                        type: "string"
                    },
                    newPassword: {
                        type: "string"
                    }
                }
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        type: "number",
                    },
                    required: true
                }
            ]
        },
        [auth])
    public async changePassword(req: Request, res: Response): Promise<Response> {
        const {
            oldPassword,
            newPassword
        } = req.body;

        const { id } = req.params;

        try {
            const user = await User.findOne({
                where: {
                    id
                },
            });

            if (!user) throw { code: 404, message: `User with id ${id} not found` };

            const isValidPassword = await compare(oldPassword, user.password);

            if (!isValidPassword) throw { code: 400, message: "Your password is wrong" };

            
            const salt = await genSalt(12);
            const hashPassword = await hash(newPassword, salt);

            await user.update({
                password: hashPassword
            });

            return successResponse({ res, msg: `Password User with id ${id} successfully updated` });

        } catch (e) {
            console.error(e);
            const err: ErrorLog = e;
            return errorResponse({ res, msg: err.message, statusCode: err.code ?? 500 });
        }
    }

    @Delete({ path: "/:id" },
        {
            responses: [
                {
                    200: {
                        description: "Response delete array",
                        responseType: "object",
                        schema: {
                            properties: {
                                success: {
                                    type: "boolean"
                                }
                            }
                        }
                    }
                }
            ]
        },
        [auth]
    )
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["password"]
            }
        });

        if (!user || user.id==1) return errorResponse({ res, msg: `User with id ${id} not found`, statusCode: 404 });

        await user.destroy();

        return successResponse({ res, data: null });
    }
}
