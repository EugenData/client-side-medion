import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IPatient } from "../../../app/models/patient";
import {v4 as uuid} from "uuid";
import PatienStore from "../../../app/stores/PatienStore";
import { observer } from "mobx-react-lite";

interface IProps {
  patient: IPatient;
  
}

const PatientsForm: React.FC<IProps> = ({
  patient: initializeFormState,
 
}) => {

  const patientStore = useContext(PatienStore);
  const {createPatient,editPatient,submitting,cancelEditMode} = patientStore;

  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: "",
        patient_name: "",
        date: "",
        meetings: []
      };
    }
  };
  const [patient, setPatient] = useState<IPatient>(initializeForm);

  const handleSubmit=()=>{
    if(patient.id.length === 0){
      let newPatient = {
        ...patient,
        id: uuid()
      }
      createPatient(newPatient);
    }else{
      editPatient(patient);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setPatient({ ...patient, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          
          placeholder="Name"
          onChange={handleInputChange}
          name={"patient_name"}
          value={patient.patient_name}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          onChange={handleInputChange}
          name={"date"}
          value={patient.date}
        />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={()=> cancelEditMode()}
          floated="right"
          negative
          type="button"
          content="Nope"
        />
      </Form>
    </Segment>
  );
};
export default observer(PatientsForm);