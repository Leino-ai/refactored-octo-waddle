import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  category: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    members: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
