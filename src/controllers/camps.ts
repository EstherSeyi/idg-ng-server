import { Request, Response } from 'express';
import { getCampsByState } from '../services/camps';

export async function fetchCamps(_req: Request, res: Response) {
  try {
    const camps = await getCampsByState();

    return res.status(200).json({ data: camps });
  } catch (error) {
    return res.status(500).json({ err: 'something went wrong' });
  }
}
