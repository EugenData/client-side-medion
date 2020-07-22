import React from "react";
import { Grid} from "semantic-ui-react";
import  PatientList  from "./PatientList";
import { observer } from "mobx-react-lite";


const PatientDashboard: React.FC = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PatientList/>
      </Grid.Column>
    </Grid>
  );
};
export default observer(PatientDashboard);
