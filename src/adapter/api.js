const API_ROOT = `http://jsonplaceholder.typicode.com/posts`;

export const getPosts = () => {
  return fetch(API_ROOT).then(res => res.json());
};

export const editPost = post => {
  console.log("editing: ", post);
  return fetch(`${API_ROOT}/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post)
  }).then(res => res.json());
};

export const deletePost = post => {
  console.log("deleting: ", post);
  return fetch(`${API_ROOT}/${post.id}`, {
    method: "DELETE",
    body: JSON.stringify(post)
  }).then(res => res.json());
};
