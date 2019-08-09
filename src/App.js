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
    isDay: true,
    theme: lightTheme
  };

  handleThemeChange = () => {
    const isDay = !this.state.isDay;
    this.setState({
      isDay: isDay,
      theme: isDay ? lightTheme : darkTheme
    });
  };
  render() {
    const { theme, isDay } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Posts handleThemeChange={this.handleThemeChange} isDay={isDay} />
      </ThemeProvider>
    );
  }
}

export default App;
