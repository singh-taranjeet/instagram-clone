import { fetchGraphQl } from "@/app/utils";

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

const comment = {
  create: {
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
    query: async function create(postId: string, content: string) {
      return fetchGraphQl(this.gql(postId, content));
    },
  },
  fetch: {
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
    query: async function fetchComment(postId: string, page: number) {
      const that = this;
      async function create(postId: string, page: number) {
        return fetchGraphQl(that.gql(postId, page));
      }
      const { data } = await create(postId, page);
      return data.post.comments;
    },
  },
};

export const queries = {
  fetchPosts: {
    name: "fetchPosts",
    queryFn: async (params: { pageParam: number }) => {
      return post.fetch(params.pageParam);
    },
  },
  createComment: {
    name: "createComment",
    mutation: async (postId: string, content: string) => {
      const { data } = await comment.create.query(postId, content);
      return data.createComment;
    },
  },
  fetchComments: {
    name: "fetchComments",
    queryFn: (postId: string) => {
      //return type is ResponseType
      return async (params: { pageParam: number }) => {
        return comment.fetch.query(postId, params.pageParam);
      };
    },
  },
};
