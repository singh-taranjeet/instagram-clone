import moment from "moment";

export const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:3000/"
    : window?.location?.href;

async function fetchGraphQl(query: string) {
  const data = await fetch("http://localhost:5555/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
}

const post = {
  gql: function GET_POSTS_QUERY(page: number) {
    return `query Posts {
      posts(page: ${page}) {
          description
          likes
          id
          createdAt
          user {
              name
              id
              profileUrl
          }
          commentsCount
          highlightedComment {
            content
            createdAt
            user {
              name
              profileUrl
            }
          }
          media {
              name
              type
              id
              url
          }
      }
  }
  `;
  },
  fetch: async function fetchPost(page: number) {
    async function getPosts(page: number) {
      return fetchGraphQl(post.gql(page));
    }

    const { data } = await getPosts(page);
    return data.posts;
  },
};

export const queries = {
  fetchUsers: {
    name: "fetchUsers",
    queryFn: () => {
      return fetch(`${baseUrl}api/users`).then((res) => res.json());
    },
  },
  fetchPosts: {
    name: "fetchPosts",
    queryFn: async (params: { pageParam: number }) => {
      return post.fetch(params.pageParam);
    },
  },
  createComment: {
    name: "createComment",
    mutation: async (postId: string, content: string) => {
      async function create(postId: string, content: string) {
        return fetchGraphQl(queries.createComment.gql(postId, content));
      }

      const { data } = await create(postId, content);
      return data.createComment;
    },
    gql: (postId: string, content: string) => {
      return `mutation CreateComment {
        createComment(
            createCommentInput: { content: "${content}", user: 9, post: ${postId} }
        ) {
            content
            likes
            id
            user {
                name
                id
                profileUrl
            }
            post {
                description
                likes
                id
                createdAt
            }
            createdAt
        }
    }`;
    },
  },
  fetchComments: {
    name: "fetchComments",
    queryFn: (postId: string) => {
      return async (params: { pageParam: number }) =>
        queries.fetchComments.mutation(postId, params.pageParam);
    },
    mutation: async (postId: string, page: number) => {
      async function create(postId: string, page: number) {
        return fetchGraphQl(queries.fetchComments.gql(postId, page));
      }
      const { data } = await create(postId, page);
      return data.post.comments;
    },
    gql: (postId: string, page: number) => {
      return `query Comments {
        post(id: ${postId}, commentPage: ${page}) {
            comments {
                content
                likes
                id
                createdAt
                user {
                    name
                    id
                    profileUrl
                }
            }
        }
    }`;
    },
  },
};

export function timeFromNow(date: Date) {
  const fromNow = moment(date).fromNow(true);

  if (fromNow === "a few seconds") {
    return "Just now";
  } else if (fromNow === "a minute") {
    return "1m";
  } else if (fromNow === "an hour") {
    return "1h";
  } else if (fromNow === "a day") {
    return "1d";
  } else if (fromNow === "a month") {
    return "1mo";
  } else if (fromNow === "a year") {
    return "1y";
  } else {
    return fromNow;
  }
}
