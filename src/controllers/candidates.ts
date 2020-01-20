import { Request, Response } from 'express';
import { getCandidates } from '../services/candidates';
import { getCandidateCount } from '../services/aggregate';

export async function fetchCandidates(req: Request, res: Response) {
  const { pageNum, pageSize } = req.query;

  try {
    const candidates = await getCandidates(
      parseInt(pageSize),
      parseInt(pageNum),
    );

    const totalCandidates = await getCandidateCount();

    return res.status(200).json({ count: totalCandidates, data: candidates });
  } catch (error) {
    return res.status(500).json({ err: 'something went wrong' });
  }
}
