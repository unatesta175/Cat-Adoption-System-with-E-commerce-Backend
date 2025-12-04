import User from '../models/User.js';

const seedUsers = async () => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: 'muhammadilyasamran@gmail.com' });

    if (!userExists) {
      const user = await User.create({
        name: 'Muhammad Ilyas Bin Amran',
        email: 'muhammadilyasamran@gmail.com',
        password: 'password123',
        role: 'user'
      });

      console.log('✅ Demo user account created');
      console.log('   Email: muhammadilyasamran@gmail.com');
      console.log('   Password: password123');
    } else {
      console.log('✅ Demo user account already exists');
    }
  } catch (error) {
    console.error('Error seeding user:', error);
  }
};

export default seedUsers;

