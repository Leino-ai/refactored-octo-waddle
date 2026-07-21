"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'admin', fitnessGoal: 'Marathon prep' },
            { name: 'Noah Brooks', email: 'noah@example.com', role: 'member', fitnessGoal: 'Strength gain' },
            { name: 'Mia Patel', email: 'mia@example.com', role: 'coach', fitnessGoal: 'Mobility' },
        ]);
        await team_1.Team.insertMany([
            { name: 'Alpha Squad', category: 'Competitive', members: [users[0].id.toString(), users[1].id.toString()] },
            { name: 'Delta Crew', category: 'Community', members: [users[2].id.toString()] },
        ]);
        await activity_1.Activity.insertMany([
            { type: 'Run', durationMinutes: 35, calories: 320, userId: users[0].id.toString() },
            { type: 'Cycling', durationMinutes: 45, calories: 410, userId: users[1].id.toString() },
            { type: 'Yoga', durationMinutes: 30, calories: 180, userId: users[2].id.toString() },
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            { userId: users[0].id.toString(), userName: users[0].name, score: 980, streak: 12 },
            { userId: users[1].id.toString(), userName: users[1].name, score: 915, streak: 8 },
            { userId: users[2].id.toString(), userName: users[2].name, score: 890, streak: 10 },
        ]);
        await workout_1.Workout.insertMany([
            { title: 'HIIT Cardio', difficulty: 'medium', durationMinutes: 25, focus: 'endurance' },
            { title: 'Strength Builder', difficulty: 'easy', durationMinutes: 35, focus: 'muscle' },
            { title: 'Core Flow', difficulty: 'medium', durationMinutes: 20, focus: 'mobility' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
