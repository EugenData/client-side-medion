import React from "react";
import { Menu, Input, Container, Button} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";


const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" secondary>
      <Container  >
        <Menu.Item header as={NavLink} to={'/patients'} >
           <img src="/assets/pregnant.png" alt="logo" style={{marginRight: 10}}/>
            При надії
            </Menu.Item> 
        
        
        <Menu.Item>
            <Button as={NavLink} to={'/createPatient'} positive content="Create patient"></Button>
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
