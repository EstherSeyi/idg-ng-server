import User from '../models/user';
import Camp from '../models/camp';
import Candidate from '../models/candidate';
import Family from '../models/family';

import dummyUsers from '../seeds/user';
import dummyCamps from '../seeds/camps';
import dummyCandidates from '../seeds/candidates';
import dummyFamilies from '../seeds/families';

export async function seedUsers() {
  try {
    const createMap = dummyUsers.map(user => {
      try {
        User.create(user);
      } catch (error) {
        console.log('Unable to seed users');
      }
    });
    await Promise.all(createMap);
    console.log('Users inserted successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export async function seedCamps() {
  try {
    const createMap = dummyCamps.map(camp => {
      try {
        Camp.create(camp);
      } catch (error) {
        console.log('Unable to seed camps');
      }
    });
    await Promise.all(createMap);
    console.log('Camps inserted successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export async function seedCandidates() {
  try {
    const createMap = dummyCandidates.map(candidate => {
      try {
        Candidate.create(candidate);
      } catch (error) {
        console.log('Unable to seed candidates');
      }
    });
    await Promise.all(createMap);
    console.log('candidates inserted successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export async function seedFamilies() {
  try {
    const createMap = dummyFamilies.map(family => {
      try {
        Family.create(family);
      } catch (error) {
        console.log('Unable to seed families');
      }
    });
    await Promise.all(createMap);
    console.log('Families inserted successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
