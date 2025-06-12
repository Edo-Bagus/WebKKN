import { Schema, Document, models, model, Types } from 'mongoose';

export interface IRelatedArticle {
  title: string;
  slug: string;
}

export interface IArticle extends Document {
  title: string;
  slug: string;
  date: Date;
  category: string;
  readingTime: string;
  author: Types.ObjectId; // refer to TeamMember
  thumbnailUrl: string;
  description: string;
  content: string;
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  readingTime: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'TeamMember', required: true }, // Ref to TeamMember
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
});

export default models.Article || model<IArticle>('Article', ArticleSchema);
