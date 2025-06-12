import { Schema, Document, model, models } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  cluster: string;
  faculty: string;
  major: string;
  instagram: string;
  linkedIn: string;
  email: string;
  pictureUrl: string;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  cluster: { type: String, required: true },
  faculty: { type: String, required: true },
  major: { type: String, required: true },
  instagram: { type: String, required: false },
  linkedIn: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  pictureUrl: {type: String, required: false}
});

export default models.TeamMember || model<ITeamMember>('TeamMember', TeamMemberSchema);
