import { Controller, Get } from "../decorators";
import { Request, Response } from "express";
import { successResponse } from "../utils";

@Controller("/")
export default class WelcomeController {
  @Get({ path: "", tag: "Welcome" },
    {
      responses: [
        {
          200: {
            description: "Response get object",
            responseType: "object",
            schema: "User"
          }
        }
      ]
    })
  public async getUsers(req: Request, res: Response): Promise<any> {
    return successResponse({
      res,
      data: {
        message: "Welcome to API v1"
      }
    });
  }
}
