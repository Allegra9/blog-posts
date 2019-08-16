import React from "react";
import Posts from "./components/posts";
import { ThemeProvider } from "emotion-theming";

const lightTheme = {
  backgroundColor: "#fff",
  textColor: "#222"
};

const darkTheme = {
  backgroundColor: "#222",
  textColor: "#fff"
};
class App extends React.Component {
  state = {
    isDay: true
  };

  componentDidMount() {
    this.setState({
      isDay: localStorage.getItem("dark") === "true"
    });
  }

  handleThemeChange = () => {
    const isDay = !this.state.isDay;
    localStorage.setItem("dark", isDay);
    this.setState({
      isDay
    });
  };
  render() {
    const isDark = localStorage.getItem("dark") === "true";
    return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Posts handleThemeChange={this.handleThemeChange} isDark={isDark} />
      </ThemeProvider>
    );
  }
}

export default App;
