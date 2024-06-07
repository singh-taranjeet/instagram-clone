export const queries = {
  fetchUsers: () => {
    return fetch("https://jsonplaceholder.typicode.com/photos").then((res) =>
      res.json()
    );
  },
  fetchPosts: () => {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    );
  },
};
