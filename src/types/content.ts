import { ComposedAccount } from "./account";

export interface Post {
  id?: string;
  content?: string;
  mediaIds?: string[];
  creatorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComposedPost extends Post {
  creator?: ComposedAccount;
  mediaUrls?: string[];
}