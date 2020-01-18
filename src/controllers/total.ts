import { Request, Response } from 'express';
import * as aggregateFuncs from '../services/total';

export async function aggregateData(_req: Request, res: Response) {
  const funcArray = Object.values(aggregateFuncs);

  const funcPromises = funcArray.map(async func => {
    try {
      return await func();
    } catch (error) {
      return {};
    }
  });

  const total = await Promise.all(funcPromises);
  return res.status(200).json({ data: total });
}
