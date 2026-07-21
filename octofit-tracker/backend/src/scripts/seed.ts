import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'admin', fitnessGoal: 'Marathon prep' },
      { name: 'Noah Brooks', email: 'noah@example.com', role: 'member', fitnessGoal: 'Strength gain' },
      { name: 'Mia Patel', email: 'mia@example.com', role: 'coach', fitnessGoal: 'Mobility' },
    ]);

    await Team.insertMany([
      { name: 'Alpha Squad', category: 'Competitive', members: [users[0].id.toString(), users[1].id.toString()] },
      { name: 'Delta Crew', category: 'Community', members: [users[2].id.toString()] },
    ]);

    await Activity.insertMany([
      { type: 'Run', durationMinutes: 35, calories: 320, userId: users[0].id.toString() },
      { type: 'Cycling', durationMinutes: 45, calories: 410, userId: users[1].id.toString() },
      { type: 'Yoga', durationMinutes: 30, calories: 180, userId: users[2].id.toString() },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0].id.toString(), userName: users[0].name, score: 980, streak: 12 },
      { userId: users[1].id.toString(), userName: users[1].name, score: 915, streak: 8 },
      { userId: users[2].id.toString(), userName: users[2].name, score: 890, streak: 10 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Cardio', difficulty: 'medium', durationMinutes: 25, focus: 'endurance' },
      { title: 'Strength Builder', difficulty: 'easy', durationMinutes: 35, focus: 'muscle' },
      { title: 'Core Flow', difficulty: 'medium', durationMinutes: 20, focus: 'mobility' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
