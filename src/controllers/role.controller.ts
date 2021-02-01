import { Controller, Get, Put, Post, Delete } from "../decorators";
import { Request, Response } from "express";
import { auth } from "../middleware/auth";
import Role from "../models/Role.model";
import { successResponse, errorResponse } from "../utils";

@Controller("/roles")
export default class RoleController {
    @Post({ path: "/", tag: "RoleController" },
        {
            responses: [
                {
                    200: {
                        description: "Response post object",
                        responseType: "object",
                        schema: "Role"
                    },
                }
            ],
            request: "NewRole"
        },
        []
    )
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
        } = req.body;
        try {
            if (!name ) {
                throw "name is required";
            }

            const role = await Role.create({
                name,
            });

            return successResponse({ res, data: role });
        } catch (e) {
            return res.status(500).json({
                sucess: false,
                message: e
            });
        }
    }

    @Get({ path: "/", tag: "RoleController" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "array",
                        schema: "Role"
                    }
                }
            ]
        })
    public async gets(req: Request, res: Response): Promise<Response> {
        const roles = await Role.findAll();
        return successResponse({ res, data: roles });
    }

    @Get({ path: "/:id", tag: "RoleController" },
        {
            responses: [
                {
                    200: {
                        description: "Response get object",
                        responseType: "object",
                        schema: "Role"
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
    public async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const role = await Role.findOne({
            where: {
                id
            },
        });

        if (!role) return errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });

        return successResponse({ res, data: role });
    }

    @Put({ path: "/:id", tag: "RoleController" },
        {
            responses: [
                {
                    200: {
                        description: "Response put object",
                        responseType: "object",
                        schema: "Role"
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
            ],
            request: {
                properties: {
                    name: {
                        type: "string"
                    },
                    lineId: {
                        type: "number"
                    }
                }
            }
        })
    public async edit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { 
            name,
            lineId
        } = req.body;
        const area = await Role.findOne({
            where: {
                id
            },
        });

        if (!area) return errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });

        const newArea = await area.update({
            name,
            lineId
        });

        return successResponse({ res, data: newArea });
    }

    @Delete({ path: "/:id", tag: "RoleController" },
        {
            responses: [
                {
                    200: {
                        description: "Response delete",
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
        },
        [auth]
    )
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const role = await Role.findOne({
            where: {
                id
            },
        });

        if (!role) return errorResponse({ res, msg: `Role with id ${id} not found`, statusCode: 404 });

        await role.destroy();

        return successResponse({ res, data: null });
    }
}
