import User from '../models/user';

import dummyUsers from '../seeds/user';

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
