import React from "react";
import { getPosts } from "../adapter/api";
import SearchIcon from "@material-ui/icons/Search";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const Montserrat = require("typeface-montserrat");
const Merriweather = require("typeface-merriweather");

class Posts extends React.Component {
  state = {
    posts: [],
    filteredPosts: [],
    clicked: [],
    query: ""
  };

  handleInputChange = e => {
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

  handleOpen = id => {
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

  componentDidMount() {
    getPosts().then(posts =>
      this.setState({
        posts
      })
    );
  }

  render() {
    const { posts, clicked, query, filteredPosts } = this.state;
    const allPosts = query ? filteredPosts : posts;
    return (
      <Container>
        <Content>
          <h1>
            Blog posts{" "}
            <span role="img" aria-label="coffee cup">
              ☕️
            </span>
          </h1>
          <form onSubmit={this.handleSubmit}>
            <SearchIcon style={{ color: "#181bed", paddingBottom: 0 }} />
            <input
              type="text"
              placeholder="Search..."
              onChange={this.handleInputChange}
            />
          </form>
          {allPosts.length > 0 ? (
            allPosts.map((post, i) => (
              <div key={post.id}>
                {clicked.includes(post.id) ? (
                  <h3 css={pinkFont} onClick={() => this.handleClose(post.id)}>
                    {post.title}
                  </h3>
                ) : (
                  <h3 css={pinkFont} onClick={() => this.handleOpen(post.id)}>
                    {post.title}
                  </h3>
                )}
                {clicked.includes(post.id) ? <p>{post.body}</p> : null}
              </div>
            ))
          ) : (
            <div>
              <h3>no posts matching "{query}"</h3>
            </div>
          )}
        </Content>
      </Container>
    );
  }
}
export default Posts;

const pink = "#d23669";
const purple = "#181bed";
const lightGrey = "#c2c0c0";
const dark = "#222";
const mont = "Montserrat, serif";
// const meri = "Merriweather, serif";
const thin = 400;
const demi = 600;
const thick = 900;

const Container = styled.div``;

const Content = styled.div`
  width: 45%;
  margin: auto;
  text-align: left;
  text-rendering: optimizeLegibility;
  h1 {
    color: ${dark};
    font-size: 35px;
    font-weight: ${thick};
  }
  p {
    color: ${dark};
    font-family: ${mont};
    font-size: 15px;
    font-weight: ${thin};
    letter-spacing: 1px;
  }
  form {
    input {
      border: 0;
      border-bottom: 2px solid ${purple};
      font-family: ${mont};
      color: ${lightGrey};
      font-size: 17px;
      font-weight: ${demi};
      padding: 3px;
      background: transparent;
      &:focus {
        outline: none !important;
      }
      ::placeholder {
        color: ${lightGrey};
      }
    }
  }
`;

const pinkFont = css`
  color: ${pink};
  font-size: 25px;
  font-weight: ${thick};
  cursor: pointer;
  font-family: ${mont};
`;
