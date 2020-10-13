import React, { useContext, useEffect } from "react";
import { Grid} from "semantic-ui-react";
import  PatientList  from "./PatientList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const PatientDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const {loadPatients,loadingInitial} = rootStore.patientStore;
 const{closeModal}=rootStore.modalStore;
  useEffect(()=>{
    loadPatients();
    closeModal();
  },[loadPatients,closeModal])

  if(loadingInitial)
  return <LoadingComponent/>
  return (
    <Grid>
      <Grid.Column width={10}>
        <PatientList/>
      </Grid.Column>
    </Grid>
  );
};
export default observer(PatientDashboard);
