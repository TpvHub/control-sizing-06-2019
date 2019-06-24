import React from "react";
import "./App.css";
import ShowList from "./containers/ShowListCount";
import Count from "./containers/ShowCountMain";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App1">
          <Count />
        </div>
        <div className="App2">
          <ShowList />
        </div>
      </div>
    );
  }
}

export default App;
