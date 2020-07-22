import React, { useEffect, Fragment,  useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PatientDashboard  from "../../features/patients/dashboard/PatientDashboard";
import LoadingComponent from '../layout/LoadingComponent';
import PatienStore from "../stores/PatienStore";
import {observer} from 'mobx-react-lite';
import { Route,withRouter, RouteComponentProps } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import PatientsForm from "../../features/patients/form/PatientsForm";
import PatientDetails from "../../features/patients/details/PatientDetails";


const App:React.FC<RouteComponentProps> = ({location}) => {
  const patientStore = useContext(PatienStore);

  useEffect(() => {
    patientStore.loadPatients();
  }, [patientStore]);
  if (patientStore.loadingInitial) return <LoadingComponent/>
  
  return (
    <Fragment>
      <NavBar  />
      <Container style={{ marginTop: "7em" }}>
       <Route exact path='/' component={HomePage}/>
       <Route exact path='/patients' component={PatientDashboard}/>
       <Route key={location.key} path={['/createPatient','/manage/:id']} component={PatientsForm}/>
       
       <Route path='/patients/:id' component={PatientDetails} />
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App)) ;
