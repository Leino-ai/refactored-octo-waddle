"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = express_1.default.Router();
router.get('/users', async (_req, res) => {
    const users = await user_1.User.find({});
    res.json(users);
});
router.get('/users/', async (_req, res) => {
    const users = await user_1.User.find({});
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
});
router.post('/users/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await team_1.Team.find({});
    res.json(teams);
});
router.get('/teams/', async (_req, res) => {
    const teams = await team_1.Team.find({});
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
router.post('/teams/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await activity_1.Activity.find({});
    res.json(activities);
});
router.get('/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find({});
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.post('/activities/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({});
    res.json(leaderboard);
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({});
    res.json(leaderboard);
});
router.post('/leaderboard', async (req, res) => {
    const entry = await leaderboard_1.Leaderboard.create(req.body);
    res.status(201).json(entry);
});
router.post('/leaderboard/', async (req, res) => {
    const entry = await leaderboard_1.Leaderboard.create(req.body);
    res.status(201).json(entry);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await workout_1.Workout.find({});
    res.json(workouts);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({});
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
router.post('/workouts/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
