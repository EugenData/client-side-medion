import React, {useContext } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { MeetingsList } from "./MeetingsList";
import { observer } from "mobx-react-lite";
import PatienStore from "../../../app/stores/PatienStore";

const PatientList: React.FC = () => {
  const patientStore = useContext(PatienStore);
  const {
    patientsByDate,
    openEditForm,
    submitting,
    deletePatient,
    target,
  } = patientStore;

  const handleOnEdit = (patientId: string) => {
    openEditForm(patientId);
  };

  return (
    <Segment clearing>
      <Item.Group relaxed>
        {patientsByDate.map((patient) => (
          
            <Item key={patient.id}>
              <Item.Content>
                <Item.Header as="a">{patient.patient_name}</Item.Header>
                <Item.Meta>{patient.date}n</Item.Meta>
                <Item.Description></Item.Description>

                <Item.Extra >
                  <MeetingsList meetings={patient.meetings} />
                </Item.Extra>

                <Item.Extra>
                  <Button
                    onClick={() => handleOnEdit(patient.id)}
                    floated="right"
                    content="Edit"
                    color="blue"
                  />
                  <Button
                    name={patient.id}
                    loading={target === patient.id && submitting}
                    onClick={(e) => deletePatient(e, patient.id)}
                    floated="right"
                    content="Delete"
                    color="black"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(PatientList);
