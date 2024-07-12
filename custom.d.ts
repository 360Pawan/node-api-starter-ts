import { Request } from "express";

declare module "express" {
  interface Request {
    // Include here for ts error in request
  }
}
