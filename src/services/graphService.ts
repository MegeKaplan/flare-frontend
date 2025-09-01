import apollo from "@/lib/apollo";
import { gql } from "@apollo/client";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      followers {
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

export const graphService = {
  getUser: (id: string) =>
    apollo.query({ query: GET_USER, variables: { id } }),

  followUser: (followerId: string, followeeId: string) =>
    apollo.mutate({ mutation: FOLLOW_USER, variables: { followerId, followeeId } }),

  unfollowUser: (followerId: string, followeeId: string) =>
    apollo.mutate({ mutation: UNFOLLOW_USER, variables: { followerId, followeeId } }),
};
