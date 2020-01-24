import Family from '../models/family';

export async function getFamilies(pageSize: number, pageNum: number) {
  pageSize = pageSize || 7;
  pageNum = pageNum || 1;

  //  Calculate number of documents to skip
  const skips = pageSize * (pageNum - 1);

  const families = await Family.find({})
    .skip(skips)
    .limit(pageSize)
    .select({ createdAt: 0, updatedAt: 0, _id: 0, __v: 0 });

  return families;
}
