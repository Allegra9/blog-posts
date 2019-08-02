import React from "react";
import Posts from "./components/posts";
import { ThemeProvider } from "emotion-theming";
import { red } from "@material-ui/core/colors";

const dayTheme = {
  color: "red",
  textColor: "#000"
};

const nightTheme = {
  color: "#222",
  textColor: "#fff"
};
class App extends React.Component {
  state = {
    isDay: true,
    theme: dayTheme
  };

  handleThemeChange = () => {
    const isDay = !this.state.isDay;
    this.setState({
      isDay: isDay,
      theme: isDay ? dayTheme : nightTheme
    });
  };
  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Posts handleThemeChange={this.handleThemeChange} />
      </ThemeProvider>
    );
  }
}

export default App;
