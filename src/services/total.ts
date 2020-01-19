import Camp from '../models/camp';
import Candidate from '../models/candidate';
import Family from '../models/family';

export async function getCampsCount() {
  const numberOfCamps = await Camp.estimatedDocumentCount((err, count) => {
    if (err) {
      throw new Error('something went wrong');
    }

    return count;
  });

  return { camps: numberOfCamps };
}

export async function getCandidateCount() {
  const numberOfCandidates = await Candidate.estimatedDocumentCount(
    (err, count) => {
      if (err) {
        throw new Error('something went wrong');
      }

      return count;
    },
  );

  return { candidates: numberOfCandidates };
}

export async function getFamilyCount() {
  const numberOfFamilies = await Family.estimatedDocumentCount((err, count) => {
    if (err) {
      throw new Error('something went wrong');
    }

    return count;
  });

  return { families: numberOfFamilies };
}

export async function getTotalChildren() {
  const results = await Family.aggregate([
    { $group: { _id: null, childTotal: { $sum: '$children' } } },
  ]);

  const children = results[0].childTotal;

  return { children };
}

export async function getStateStats() {
  const allStates = await Camp.aggregate([
    {
      $group: {
        _id: '$name',
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const states = allStates.map(state => {
    return {
      state: state._id,
      total: state.total,
    };
  });

  return { states };
}

export async function getGenderStats() {
  const genderStats = await Candidate.aggregate([
    {
      $group: {
        _id: '$gender',
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const gender = genderStats.map(gender => {
    return {
      gender: gender._id,
      total: gender.total,
    };
  });

  return { gender };
}

export async function getMaritalStats() {
  const maritalStats = await Candidate.aggregate([
    {
      $group: {
        _id: '$marital_status',
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const maritalStatus = maritalStats.map(status => {
    return {
      status: status._id,
      total: status.total,
    };
  });

  return { maritalStatus };
}
