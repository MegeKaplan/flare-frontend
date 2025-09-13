import { ComposedAccount } from "./account";

export enum ContentType {
  POST = "post",
  STORY = "story",
}

export interface Post {
  id?: string;
  content?: string;
  mediaIds?: string[];
  creatorId?: string;
  type?: ContentType;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string | null;
}

export interface ComposedPost extends Post {
  creator?: ComposedAccount;
  mediaUrls?: { raw: string; processed: string | null }[];
  media?: any[]; // change any to media type if available
  likes?: string[];
}

export interface Story extends ComposedPost { }