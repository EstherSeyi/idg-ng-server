import Candidate from '../models/candidate';

export async function getCandidates(pageSize: number, pageNum: number) {
  pageSize = pageSize || 7;
  pageNum = pageNum || 1;

  //  Calculate number of documents to skip
  const skips = pageSize * (pageNum - 1);

  const candidates = await Candidate.find({})
    .skip(skips)
    .limit(pageSize);

  return candidates;
}
