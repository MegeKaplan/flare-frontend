import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + "/flare/graphql",
});

const authLink = new SetContextLink((prevContext, operation) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "X-Client-Id": "flare",
    },
  };
});

const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apollo;
