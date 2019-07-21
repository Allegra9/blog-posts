import React from "react";

class Posts extends React.Component {
  state = {
    posts: [],
    filteredPosts: [],
    clicked: [],
    query: ""
  };

  handleInputChange = e => {
    console.log(e.target.value);
    const { posts, query } = this.state;
    this.setState(
      {
        query: e.target.value
      },
      () => {
        if (query && query.length > 0) {
          const postsCopy = [...posts];
          const filtered = postsCopy.filter(post => post.title.includes(query));
          this.setState({
            filteredPosts: filtered
          });
        }
      }
    );
  };

  handleClick = id => {
    this.setState({
      clicked: [...this.state.clicked, id]
    });
  };

  handleClose = id => {
    const filtered = this.state.clicked.filter(postId => postId !== id);
    this.setState({
      clicked: filtered
    });
  };

  handleSubmit = e => e.preventDefault();

  getPosts = () => {
    return fetch("http://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts =>
        this.setState({
          posts
        })
      );
  };

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts, clicked, query, filteredPosts } = this.state;
    const allPosts = query ? filteredPosts : posts;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Search..." onChange={this.handleInputChange} />
        </form>
        {allPosts.length > 0
          ? allPosts.map((post, i) => (
              <div key={post.id}>
                {clicked.includes(post.id) ? (
                  <h3 onClick={() => this.handleClose(post.id)}>
                    {post.title}
                  </h3>
                ) : (
                  <h3 onClick={() => this.handleClick(post.id)}>
                    {post.title}
                  </h3>
                )}
                {clicked.includes(post.id) ? <p>{post.body}</p> : null}
              </div>
            ))
          : "no posts"}
      </div>
    );
  }
}
export default Posts;
