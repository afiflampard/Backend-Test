import {Request} from "express";
import User from "../models/User.model";

export interface _Request extends Request {
  user?: User
}
