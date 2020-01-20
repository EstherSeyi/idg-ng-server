import Camp from '../models/camp';

export async function getCampsByState() {
  const camps = await Camp.aggregate([
    { $group: { _id: '$name', childTotal: { $sum: '$children' } } },
  ]);

  return camps.map(camp => camp._id);
}
