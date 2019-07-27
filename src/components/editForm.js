import React from "react";
import { editPost } from "../adapter/api";
import EditIcon from "@material-ui/icons/Edit";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

class EditForm extends React.Component {
  state = {
    id: "",
    userId: "",
    title: "",
    body: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;
    if (title.length > 0 && body.length > 0) {
      editPost(this.state).then(res => {
        if (res.error) {
          let errors = {};
          console.log(res.error);
          errors["server"] = res.erorr;
          this.setState({
            errors
          });
        } else {
          console.log(res); //just an id
          this.props.cancel();
        }
      });
    } else {
      let errors = {};
      if (!title) {
        errors["title"] = "*title is required";
      }
      if (!body) {
        errors["body"] = "*body is required";
      }
      this.setState({
        errors
      });
    }
  };

  componentDidMount() {
    const { post } = this.props;
    this.setState({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body
    });
  }
  render() {
    const { title, body } = this.state;
    const { cancel } = this.props;
    return (
      <Container>
        <h2>
          <EditIcon style={{ marginRight: 5, color: "#d23669" }} />
          Edit mode
        </h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Title:</h4>
          <textarea
            type="text"
            value={title}
            name="title"
            css={titleTextArea}
            onChange={this.handleChange}
          />
          <div css={errorMsg}>{this.state.errors.title}</div>
          <h4>Body:</h4>
          <textarea
            type="text"
            value={body}
            name="body"
            css={bodyTextArea}
            onChange={this.handleChange}
          />
          <div css={errorMsg}>{this.state.errors.body}</div>
          <div css={errorMsg}>{this.state.errors.server}</div>
          <Buttons>
            <CancelBtn onClick={cancel}>cancel</CancelBtn>
            <SubmitBtn type="submit" onClick={this.handleSubmit}>
              submit
            </SubmitBtn>
          </Buttons>
        </form>
      </Container>
    );
  }
}
export default EditForm;

const pink = "#d23669";
const mont = "Montserrat, serif";

const Container = styled.div`
  text-align: center;
  font-family: ${mont};
  border: 1px solid ${pink};
  border-radius: 10px;
  form {
    width: 70%;
    margin: auto;
  }
  textarea {
    width: 100%;
    font-family: ${mont};
    font-size: 14px;
    border-radius: 10px;
    border: 1px solid ${pink};
    padding: 10px;
    &:focus {
      outline: none !important;
    }
  }
  h4 {
    text-align: left;
  }
`;

const titleTextArea = css`
  height: 50px;
`;

const bodyTextArea = css`
  height: 150px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
  div {
    width: 150px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    padding: 7px 0;
  }
`;

const SubmitBtn = styled.div`
  background: green;
  color: #fff;
`;

const CancelBtn = styled.div`
  color: grey;
  border: 1px solid grey;
  height: 20px;
`;

const errorMsg = css`
  color: red;
  text-align: left;
`;
