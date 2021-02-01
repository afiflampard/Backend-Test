import { Controller, Post } from "../decorators";
import { Request, Response } from "express";
import { envConfig, successResponse } from "../utils";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import BodyLogin from "../interfaces/BodyLogin.interface";
import ErrorLog from "../interfaces/ErrorLog.interface";
import User from "../models/User.model";
import { auth, tokenExtractor } from "../middleware/auth";
import jwt from "jsonwebtoken";
import moment from "moment";

const { JWT_SECRET, JWT_EXPIRE } = envConfig;

interface Claims {
    user: number
}

interface TokenDecode {
    claims: Claims,
    iat: number,
    exp: number
}

@Controller("/auths")
export default class AuthController {
    @Post({ path: "/login", tag: "Login" },
        {
            responses: [
                {
                    200: {
                        description: "Response token",
                        responseType: "object",
                        schema: {
                            properties: {
                                token: {
                                    type: "string"
                                }
                            }
                        }
                    },
                }
            ],
            request: {
                properties: {
                    username: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                },
                required: ["username", "password"]
            }
        }
    )
    public async index(req: Request, res: Response): Promise<Response> {
        const bodyLogin: BodyLogin = req.body;
        let user: User, hashResult: boolean, token: string;

        try {
            if (!bodyLogin.username || !bodyLogin.password) {
                throw { code: 400, message: "User credential not found" };
            }

            user = await User.findOne({
                where: {
                    username: bodyLogin.username
                }
            });

            if (!user) throw { code: 404, message: "User Not found" };

            hashResult = await compare(bodyLogin.password, user.password);

            if (!hashResult) throw { code: 400, message: "Password didn't match" };

            await user.update({
                lastLoginAt: new Date()
            });
            
            token = sign({
                claims: { user: user.id }
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE
            });

            if (!token) throw { code: 400, message: "Failed to generate token" };
            

            return successResponse({
                res,
                data: { token }
            });
        } catch (e) {
            const error: ErrorLog = e;
            return res.status(error.code || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    @Post({ path: "/refresh-token", tag: "Refresh-token" }, {
        responses: [
            {
                200: {
                    description: "Response token",
                    responseType: "object",
                    schema: "User"
                },
                500: {
                    description: "Response post object",
                    responseType: "object",
                    schema: "User"
                },
            }
        ]
    }, [auth])
    public async refresh(req: Request, res: Response): Promise<Response> {
        try {
            const token = tokenExtractor(req.headers["authorization"]);
            const tokenDecode: TokenDecode = jwt.verify(token, JWT_SECRET) as TokenDecode;
            
            if (!tokenDecode) throw "invalid token";

            const userId = tokenDecode.claims.user;
            const newToken: string = sign({
                claims: { user: userId }
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE
            });

            return successResponse({
                res,
                data: {
                    token: newToken
                }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: e
            });
        }
    }
}
