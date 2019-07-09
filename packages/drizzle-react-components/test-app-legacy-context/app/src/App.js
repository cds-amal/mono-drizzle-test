import React, { Component } from "react";
import { DrizzleProvider } from "@drizzle/drizzle-react";
import { LoadingContainer } from "@drizzle/drizzle-react-components";

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <MyContainer />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
