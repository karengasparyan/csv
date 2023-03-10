import {NextFunction, Request, Response} from "express";
import httpError from 'http-errors';
import {transformCSVData, writeCSVData} from "../service/convertor";

class Convertors {
  public async jsonToCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;

      if (!file || file.mimetype !== 'text/csv')
        return next(httpError(400, 'File is mandatory and must be json type'))

      const data = await transformCSVData(file);
      const url = await writeCSVData(data);

      return res.status(200).send({
        status: 'success',
        message: 'Output CSV generated',
        url
      })
    } catch (e) {
      return next(e)
    }
  }

}

export default new Convertors();