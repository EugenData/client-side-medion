import React, { useEffect, Fragment,  useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PatientDashboard  from "../../features/patients/dashboard/PatientDashboard";
import LoadingComponent from '../layout/LoadingComponent';
import PatienStore from "../stores/PatienStore";
import {observer} from 'mobx-react-lite';


const App = () => {
  const patientStore = useContext(PatienStore);

  useEffect(() => {
    patientStore.loadPatients();
  }, [patientStore]);
  if (patientStore.loadingInitial) return <LoadingComponent/>
  
  return (
    <Fragment>
      <NavBar  />
      <Container style={{ marginTop: "7em" }}>
        <PatientDashboard/>
      </Container>
    </Fragment>
  );
};

export default observer(App);
