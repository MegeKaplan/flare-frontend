import { ComposedAccount } from "./account";

export interface Post {
  id?: string;
  content?: string;
  mediaIds?: string[];
  creatorId?: string;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string | null;
}

export interface ComposedPost extends Post {
  creator?: ComposedAccount;
  mediaUrls?: { raw: string; processed: string | null }[];
  likes?: string[];
}