import {NextFunction, Request, Response} from "express";
import httpError from "http-errors";
const {NODE_ENV} = process.env;

export const error404 = (req: Request, res: Response, next: NextFunction) => {
 return next(httpError(404));
}

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || 500).send({
    status: "error",
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : {},
  });
}

