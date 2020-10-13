import React, { Fragment, useContext } from "react";
import { Container, Segment, Header, Button } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import User from "../user/User";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="gradient">
      <Container text className="homeContainer">
        <Header as="h1" inverted>
          Medion
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName} `}
            />
            <Button as={Link} to="/patients" size="huge" inverted>
              All patients
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            {/* <Header as="h2" inverted content={`Welcome`} /> */}
            <Button onClick={() => openModal(<User />)} size="huge" inverted>
              Login
            </Button>
          </Fragment>
        )}
        <Fragment></Fragment>
      </Container>
    </Segment>
  );
};
export default HomePage;