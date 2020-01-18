import Camp from '../models/camp';
import Candidate from '../models/candidate';
import Family from '../models/family';

export async function getCampsCount() {
  return Camp.estimatedDocumentCount((err, count) => {
    if (err) {
      throw new Error('something went wrong');
    }

    return count;
  });
}

export async function getCandidateCount() {
  return Candidate.estimatedDocumentCount((err, count) => {
    if (err) {
      throw new Error('something went wrong');
    }

    return count;
  });
}

export async function getFamilyCount() {
  return Family.estimatedDocumentCount((err, count) => {
    if (err) {
      throw new Error('something went wrong');
    }

    return count;
  });
}

export async function getTotalChildren() {
  return Family.aggregate([
    { $group: { _id: null, childTotal: { $sum: '$children' } } },
  ]);
}

export async function getStateStats() {
  return Camp.aggregate([
    {
      $group: {
        _id: '$name',
        total: {
          $sum: 1,
        },
      },
    },
  ]);
}

export async function getGenderStats() {
  return Candidate.aggregate([
    {
      $group: {
        _id: '$gender',
        total: {
          $sum: 1,
        },
      },
    },
  ]);
}

export async function getMaritalStats() {
  return Candidate.aggregate([
    {
      $group: {
        _id: '$marital_status',
        total: {
          $sum: 1,
        },
      },
    },
  ]);
}
