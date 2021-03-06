import React from "react";
import { editPost } from "../adapter/api";
import EditIcon from "@material-ui/icons/Edit";
//import blueCoffee from "../images/blueCoffeeCup.png";

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
          <EditIcon style={{ marginRight: 5, color: "#222" }} />
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
const dark = "#222";
const mont = "Montserrat, serif";
// const pastelBlue = "#a6e0ff";
const newBlue = "#66C6DA";
const cream = "#fcf9ed";

// background: url(${blueCoffee});
// background-size: 160px;

const Container = styled.div`
  text-align: center;
  font-family: ${mont};
  border: 2px solid ${props => props.theme.textColor};
  background: ${props => props.theme.backgroundColor};
  border-radius: 10px;
  margin-bottom: 200px;
  form {
    width: 70%;
    margin: auto;
  }
  textarea {
    width: 100%;
    font-family: ${mont};
    font-size: 14px;
    border-radius: 10px;
    background: ${cream};
    padding: 10px;
    &:focus {
      outline: none !important;
    }
  }
  h2 {
    color: ${props => props.theme.textColor};
  }
  h4 {
    text-align: left;
    color: ${props => props.theme.textColor};
  }
  @media screen and (max-width: 750px) {
    form {
      width: 80%;
    }
    textarea {
      width: 90%;
    }
    h4 {
      text-align: center;
    }
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
  background: ${pink};
  color: #fff;
`;

const CancelBtn = styled.div`
  color: grey;
  border: 1px solid grey;
  background: ${cream};
  height: 20px;
`;

const errorMsg = css`
  color: red;
  text-align: left;
`;
