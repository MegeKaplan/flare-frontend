import apollo from "@/lib/apollo";
import { gql } from "@apollo/client";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      followers {
        id
      }
      follows {
        id
      }
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($followerId: ID!, $followeeId: ID!) {
    followUser(followerId: $followerId, followeeId: $followeeId)
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($followerId: ID!, $followeeId: ID!) {
    unfollowUser(followerId: $followerId, followeeId: $followeeId)
  }
`;

const GET_CONTENT = gql`
  query Content($id: ID!) {
    content(id: $id) {
      id
      likes {
        id
      }
    }
  }
`;

const LIKE_CONTENT = gql`
  mutation LikeContent($userId: ID!, $contentId: ID!) {
    likeContent(userId: $userId, contentId: $contentId)
  }
`;

const UNLIKE_CONTENT = gql`
  mutation UnlikeContent($userId: ID!, $contentId: ID!) {
    unlikeContent(userId: $userId, contentId: $contentId)
  }
`;

export const graphService = {
  getUser: (id: string) =>
    apollo.query({ query: GET_USER, variables: { id } }),

  followUser: (followerId: string, followeeId: string) =>
    apollo.mutate({ mutation: FOLLOW_USER, variables: { followerId, followeeId } }),

  unfollowUser: (followerId: string, followeeId: string) =>
    apollo.mutate({ mutation: UNFOLLOW_USER, variables: { followerId, followeeId } }),

  getContent: (id: string) =>
    apollo.query({ query: GET_CONTENT, variables: { id } }),

  likeContent: (userId: string, contentId: string) =>
    apollo.mutate({ mutation: LIKE_CONTENT, variables: { userId, contentId } }),

  unlikeContent: (userId: string, contentId: string) =>
    apollo.mutate({ mutation: UNLIKE_CONTENT, variables: { userId, contentId } })
};
