import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import PostPage from "../../pages/PostPage";
import AddPostPage from "../../pages/AddPostPage";
import AboutPage from "../../pages/AboutPage";
import RegisterPage from "../../pages/RegisterPage";
import { AuthContext, LoadingContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

const Root = styled.div`
  margin-top: 72px;
`;

const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  background: #e9e7da;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgba(20%, 20%, 40%, 0.5);
  margin-bottom: 40px;
  color: #373f27;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Root>
          <Wrapper>
            <Router>
              <Header></Header>
              <Switch>
                <Route exact path='/'>
                  <HomePage />
                </Route>
              </Switch>
              <Switch>
                <Route path='/posts/:page'>
                  <HomePage />
                </Route>
              </Switch>
              <Route exact path='/login'>
                <LoginPage />
              </Route>
              <Route path='/post/:id'>
                <PostPage />
              </Route>
              <Route exact path='/addPost'>
                <AddPostPage />
              </Route>
              <Route exact path='/about'>
                <AboutPage />
              </Route>
              <Route exact path='/register'>
                <RegisterPage />
              </Route>
            </Router>
          </Wrapper>
        </Root>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
