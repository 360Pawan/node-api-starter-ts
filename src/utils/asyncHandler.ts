import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (requestHandler: RequestHandler) => {
  return (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(requestHandler(request, response, next)).catch((error) =>
      next(error)
    );
};
