import { Schema, Document, models, model } from 'mongoose';

export interface IAuthor {
  name: string;
  photoUrl: string;
}

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
  author: IAuthor;
  thumbnailUrl: string;
  description: string;
  content: string;
  relatedArticles: IRelatedArticle[];
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  readingTime: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  relatedArticles: [
    {
      title: { type: String, required: true },
      slug: { type: String, required: true },
    },
  ],
});

export default models.Article || model<IArticle>('Article', ArticleSchema);
