import React, { Fragment, useContext, useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import { observer}  from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from 'react-router';
import  HomePage  from '../../features/home/HomePage';
import PatientsForm from "../../features/patients/form/PatientsForm";
import PatientDetails from '../../features/patients/details/PatientDetails';
import NotFound from "./NotFound";
import { RootStoreContext } from "../stores/rootStore";
import  ModalContainer  from "../common/modals/ModalContainer";
import LoadingComponent from "./LoadingComponent";
import PrivateRoot from "./PrivateRoot";




const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded,token,appLoaded}= rootStore.commonStore;
  const {getUser}= rootStore.userStore;

useEffect(() => {
  if(token){
    getUser().finally(() => setAppLoaded())
  }else{
    setAppLoaded();
  }
  
  }, [getUser,setAppLoaded,token])

  if (!appLoaded)  return <LoadingComponent />

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position="bottom-right" />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
             <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoot exact path="/patients" component={PatientDashboard} />
                <PrivateRoot exact path = '/patients/:id' component={PatientDetails} />
                <PrivateRoot
                  key={location.key}
                  path={["/createPatient", "/manage/:id"]}
                  component={PatientsForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
