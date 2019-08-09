import React from "react";
import { getPosts } from "../adapter/api";
import SearchIcon from "@material-ui/icons/Search";
import Dropdown from "./dropdown";
import EditForm from "./editForm";
import DeleteDialog from "./deleteDialog";
import { deletePost } from "../adapter/api";
import Toggle from "./switch/Toggle";

import sun from "../images/sun.png";
import moon from "../images/moon.png";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

// eslint-disable-next-line
const Montserrat = require("typeface-montserrat");
// eslint-disable-next-line
const Merriweather = require("typeface-merriweather");

class Posts extends React.Component {
  state = {
    posts: [],
    filteredPosts: [],
    clicked: [],
    query: "",
    postToEdit: "",
    postToDelete: ""
  };

  handleInputChange = e => {
    const query = e.target.value;
    const { posts } = this.state;

    if (query && query.length > 0) {
      console.log(query);
      const postsCopy = [...posts];
      const filtered = postsCopy.filter(post => post.title.includes(query));
      this.setState({
        filteredPosts: filtered,
        query
      });
    }
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

  handleEdit = post => {
    this.setState({
      postToEdit: post
    });
  };

  cancelEdit = () => {
    this.setState({
      postToEdit: ""
    });
  };

  selectToDelete = post => {
    console.log("delete: ", post);
    this.setState({
      postToDelete: post
    });
  };

  handleDelete = post => {
    //assume the res is success:
    //(optimistic rendering)
    let now = new Date();
    let time =
      now.getHours() +
      ":" +
      now.getMinutes() +
      ":" +
      now.getSeconds() +
      ":" +
      now.getMilliseconds();
    console.log("deleted:", time, post);
    this.cancelDelete();
    this.handleClose(post.id);
    //fake the deletion:
    const { posts } = this.state;
    const postsCopy = [...posts];
    const filtered = postsCopy.filter(p => p.id !== post.id);
    this.setState({
      posts: filtered
    });
    deletePost(post).then(res => {
      if (res.error) {
        console.log(res.error);
        alert(res.error);
        //then we will bring back the "deleted" post in it's place (sorting by id)
        const { posts } = this.state;
        let postsCopy = [...posts, post];
        postsCopy = postsCopy.sort(this.compareValues("id"));
        this.setState({
          posts: postsCopy
        });
      } else {
        let now = new Date();
        let time =
          now.getHours() +
          ":" +
          now.getMinutes() +
          ":" +
          now.getSeconds() +
          ":" +
          now.getMilliseconds();
        console.log("it's all already done", time);
      }
    });
  };

  compareValues = (key, order = "asc") => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      console.log(comparison);
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  cancelDelete = post => {
    // this.handleClose(post.id);
    this.setState({
      postToDelete: ""
    });
  };

  componentDidMount() {
    getPosts().then(posts =>
      this.setState({
        posts
      })
    );
  }

  render() {
    const {
      posts,
      clicked,
      query,
      filteredPosts,
      postToEdit,
      postToDelete
    } = this.state;
    const { handleThemeChange, isDay } = this.props;
    const allPosts = query ? filteredPosts : posts;
    console.log(postToDelete);
    return (
      <Container>
        <Content>
          <h1>
            Blog posts {window.innerHeight}{" "}
            <span role="img" aria-label="coffee cup">
              ☕️
            </span>
          </h1>
          <Switch>
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                    alt="moon icon"
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width="16"
                    height="16"
                    role="presentation"
                    style={{ pointerEvents: "none" }}
                    alt="sun icon"
                  />
                )
              }}
              checked={!isDay}
              onChange={handleThemeChange}
            />
          </Switch>
          {/* {postToDelete ? (
            <DeleteDialog
              post={postToDelete}
              handleDelete={this.handleDelete}
              cancel={this.cancelDelete}
            />
          ) : null} */}
          {postToEdit ? (
            <EditForm post={postToEdit} cancel={this.cancelEdit} />
          ) : (
            <div
              style={
                allPosts.length < 20
                  ? { paddingBottom: 700 }
                  : { paddingBottom: 100 }
              }
            >
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
                      <CurrentPost>
                        <h3
                          css={pinkFont}
                          onClick={() => this.handleClose(post.id)}
                        >
                          {post.title}
                        </h3>
                        <div>
                          <IconContainer>
                            <Dropdown
                              style={{ paddingBottom: 0 }}
                              post={post}
                              handleEdit={this.handleEdit}
                              handleDelete={this.handleDelete}
                              // selectToDelete={this.selectToDelete}
                            />
                          </IconContainer>
                        </div>
                      </CurrentPost>
                    ) : (
                      <h3
                        css={pinkFont}
                        onClick={() => this.handleOpen(post.id)}
                      >
                        {post.title} - {post.id}
                      </h3>
                    )}
                    {clicked.includes(post.id) ? <p>{post.body}</p> : null}
                  </div>
                ))
              ) : (
                <div style={{ paddingBottom: 700 }}>
                  <h3>no posts matching "{query}"</h3>
                </div>
              )}
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
const cream = "#fffcf2";
const lightGrey = "#c2c0c0";
const dark = "#222";
const mont = "Montserrat, serif";
// const meri = "Merriweather, serif";
const thin = 400;
const demi = 600;
const thick = 900;

const Container = styled.div`
  background: ${props => props.theme.backgroundColor};
  border: 1px solid ${cream};
`;

const Content = styled.div`
  width: 45%;
  margin: auto;
  text-align: left;
  text-rendering: optimizeLegibility;
  padding-top: 1em;
  h1 {
    color: ${props => props.theme.textColor};
    font-size: 35px;
    font-weight: ${thick};
  }
  h3 {
    margin-top: auto;
    margin-bottom: 20px;
  }
  p {
    color: ${props => props.theme.textColor};
    font-family: ${mont};
    font-size: 15px;
    font-weight: ${thin};
    letter-spacing: 1px;
    margin-top: 0;
    margin-bottom: 30px;
  }
  form {
    margin-bottom: 20px;
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
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 750px) {
    width: 90%;
    h1 {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 360px) {
    h1 {
      font-size: 25px;
    }
  }
`;

const Switch = styled.div`
  float: right;
  margin-top: -60px;
  @media screen and (max-width: 750px) {
    margin-top: -53px;
  }
  @media screen and (max-width: 360px) {
    margin-top: -48px;
  }
`;

const pinkFont = css`
  color: ${pink};
  font-size: 25px;
  font-weight: ${thick};
  cursor: pointer;
  font-family: ${mont};
`;

const CurrentPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  div {
    display: flex;
    justify-content: center;
  }
  h3 {
    margin-top: auto;
    margin-bottom: 20px;
  }
`;

const IconContainer = styled.div`
  padding: 2px;
  cursor: pointer;
  svg {
    color: ${lightGrey};
    &:hover {
      color: ${purple};
    }
  }
`;
