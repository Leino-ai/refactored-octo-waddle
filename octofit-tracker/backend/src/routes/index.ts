import express from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = express.Router();

router.get('/users', async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get('/users/', async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.post('/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find({});
  res.json(leaderboard);
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find({});
  res.json(leaderboard);
});

router.post('/leaderboard', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.post('/leaderboard/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
