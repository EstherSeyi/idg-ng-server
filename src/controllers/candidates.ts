import { Request, Response } from 'express';
import { getCandidates, selectCandidates } from '../services/candidates';
import { getCandidateCount } from '../services/aggregate';

export async function fetchCandidates(req: Request, res: Response) {
  const { pageNum } = req.params;

  try {
    const candidates = await getCandidates(parseInt(pageNum));

    const totalCandidates = await getCandidateCount();

    return res.status(200).json({ count: totalCandidates, data: candidates });
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
}

export async function filterCandidates(req: Request, res: Response) {
  const { pageNum } = req.params;
  const filterParams = req.body;

  try {
    const candidates = await selectCandidates(parseInt(pageNum), filterParams);

    return res.status(200).json({ count: candidates.length, data: candidates });
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
}
