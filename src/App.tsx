import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import Main from "./components/Main";

import { thunkFetchMultipleComments } from "./store/thunks";

import Home from "./pages/Home";
import ChosenComments from "./pages/ChosenComments";
import CreateComment from "./pages/CreateComment";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body {
    margin: 0;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }
  textarea {
    font-family: 'Roboto', sans-serif;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 480px;
  font-family: "Roboto", sans-serif;
`;

interface AppProps {
  thunkFetchMultipleComments: (numberOfComments: number) => void;
}

function App({ thunkFetchMultipleComments }: AppProps) {
  useEffect(() => {
    thunkFetchMultipleComments(20);
  }, [thunkFetchMultipleComments]);

  return (
    <Router>
      <GlobalStyles />
      <AppWrapper>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/chosen-comments">
              <ChosenComments />
            </Route>
            <Route path="/create-comment">
              <CreateComment />
            </Route>
          </Switch>
        </Main>
      </AppWrapper>
    </Router>
  );
}

const mapDispatchToProps = {
  thunkFetchMultipleComments,
};

export default connect(null, mapDispatchToProps)(App);
