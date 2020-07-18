import React, { useContext } from "react";
import { Menu, Input, Container, Button } from "semantic-ui-react";
import PatienStore from "../../app/stores/PatienStore";
import { observer } from "mobx-react-lite";



const NavBar: React.FC = () => {
  const patientStore = useContext(PatienStore);

  return (
    <Menu fixed="top" secondary>
      <Container  >
        <Menu.Item header >
           <img src="/assets/pregnant.png" alt="logo" style={{marginRight: 10}}/>
            При надії
            </Menu.Item> 
        <Menu.Item  name="home" />
        
        <Menu.Item>
            <Button onClick={patientStore.openCreateForm} positive content="Create patient"></Button>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default observer(NavBar);
