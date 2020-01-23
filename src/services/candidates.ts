import Candidate from '../models/candidate';

export async function getCandidates(pageNum: number) {
  const pageSize = 7;
  pageNum = pageNum || 1;

  //  Calculate number of documents to skip
  const skips = pageSize * (pageNum - 1);

  const candidates = await Candidate.find({})
    .skip(skips)
    .limit(pageSize)
    .select({ createdAt: 0, updatedAt: 0, _id: 0, __v: 0 });

  return candidates;
}

export async function selectCandidates(pageNum: number, filterParams: {}) {
  pageNum = pageNum || 1;
  const pageSize = 7;

  //  Calculate number of documents to skip
  const skips = pageSize * (pageNum - 1);

  const candidates = await Candidate.find(filterParams)
    .skip(skips)
    .limit(pageSize)
    .select({ createdAt: 0, updatedAt: 0, _id: 0, __v: 0 });

  return candidates;
}
