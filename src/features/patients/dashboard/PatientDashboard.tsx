import React, { useContext } from "react";
import { Grid} from "semantic-ui-react";
import  PatientList  from "./PatientList";
import { PatientDetails } from "../details/PatientDetails";

import { observer } from "mobx-react-lite";
import PatienStore from '../../../app/stores/PatienStore';
import PatientsForm from "../form/PatientsForm";


const PatientDashboard: React.FC = ({
}) => {
  const patientStore = useContext(PatienStore);
  const{editMode,selectedPatient}= patientStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <PatientList
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {editMode && (
          <PatientsForm
            key={(selectedPatient && selectedPatient.id) || 0}
            patient={selectedPatient!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default observer(PatientDashboard);
