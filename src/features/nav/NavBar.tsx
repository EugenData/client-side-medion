import React, { useContext } from "react";
import { Menu, Input, Container, Button, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  const { setSearch } = rootStore.patientStore;
  const { token } = rootStore.commonStore;
  return (
    <Menu fixed="top" stackable pointing inverted>
      <Container>
        <Menu.Item header as={Link} to={"/"}>
          <img
            src="/assets/pregnant.png"
            alt="logo"
            style={{ marginRight: 10 }}
          />
        </Menu.Item>
        <Menu.Item as={NavLink} to={"/patients"} style={{ color: "white" }}>
          Усі пацієнти
        </Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to={"/createPatient"}
            positive
            content="Створити запис"
          ></Button>
        </Menu.Item>
        

        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Пошук пацієнта..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Menu.Item>
          {user && (
            <Menu.Item>
              <Dropdown pointing="top left" text={user.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout} text="Вийти" icon="power" />
                  <Dropdown.Item
                    as="a"
                    href={`/hangfire?a_token=${token}`}
                    text="Hangfire"
                    icon="fire"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default observer(NavBar);
