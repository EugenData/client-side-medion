import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IPatient } from "../../../app/models/patient";
import { v4 as uuid } from "uuid";
import PatienStore from "../../../app/stores/PatienStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface IProps {
  id: string;
}

const PatientsForm: React.FC<RouteComponentProps<IProps>> = ({
  match,
  history,
}) => {
  const patientStore = useContext(PatienStore);
  const {
    createPatient,
    editPatient,
    submitting,
    patient: initializeFormState,
    loadPatient,
    clearPatient,
  } = patientStore;

  const [patient, setPatient] = useState<IPatient>({
    id: "",
    patient_name: "",
    date: "",
    meetings: [],
  });

  useEffect(() => {
    if (match.params.id && patient.id.length === 0) {
      loadPatient(match.params.id).then(
        () => initializeFormState && setPatient(initializeFormState)
      );
    }
    return () => {
      clearPatient();
    };
  }, [
    loadPatient,
    clearPatient,
    match.params.id,
    initializeFormState,
    patient.id.length,
  ]);

  const handleSubmit = () => {
    if (patient.id.length === 0) {
      let newPatient = {
        ...patient,
        id: uuid(),
      };
      createPatient(newPatient).then(() =>
        history.push(`/patients/${newPatient.id}`)
      );
    } else {
      editPatient(patient).then(() => history.push(`/patients/${patient.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          negative
          type="button"
          content="Nope"
          onClick={() => history.push("/patients")}
        />
      </Form>
    </Segment>
  );
};
export default observer(PatientsForm);
