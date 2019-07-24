const API_ROOT = `http://jsonplaceholder.typicode.com/posts`;

export const getPosts = () => {
  return fetch(API_ROOT).then(res => res.json());
};
