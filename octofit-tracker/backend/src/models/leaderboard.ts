import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  userName: string;
  score: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
