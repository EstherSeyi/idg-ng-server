import { Request, Response } from 'express';
import { getFamilies } from '../services/families';
import { getFamilyCount } from '../services/aggregate';

export async function fetchFamilies(req: Request, res: Response) {
  const { pageNum, pageSize } = req.query;

  try {
    const families = await getFamilies(parseInt(pageSize), parseInt(pageNum));

    const totalFamilies = await getFamilyCount();

    return res.status(200).json({ count: totalFamilies, data: families });
  } catch (error) {
    return res.status(500).json({ err: 'something went wrong' });
  }
}
