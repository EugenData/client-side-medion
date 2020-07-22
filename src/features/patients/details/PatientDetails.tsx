import React, { useContext, useEffect } from "react";
import {Card, Button } from "semantic-ui-react";
import { RouteComponentProps, Link } from "react-router-dom";
import PatientStore from "../../../app/stores/PatienStore"
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface DetailParams{
    id:string;
}

const PatientDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {

    const patientStore = useContext(PatientStore);
    const {patient,loadPatient,loadingInitial} = patientStore;
    
    useEffect(() => {
       loadPatient(match.params.id);
    }, [loadPatient,match.params.id]);
    
    if (loadingInitial || !patient) return <LoadingComponent />
    return(
        <Card fluid>
     
      <Card.Content>
        <Card.Header>{patient!.patient_name}</Card.Header>
        <Card.Meta>
          <span>{patient!.date}</span>
        </Card.Meta>
       
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manage/${patient!.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/patients')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
    );
};
export default observer(PatientDetails);