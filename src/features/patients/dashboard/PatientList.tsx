import React, { useContext } from "react";
import { Item, Button, Segment, Table } from "semantic-ui-react";
import { MeetingsList } from "./MeetingsList";
import { observer } from "mobx-react-lite";
import PatienStore from "../../../app/stores/PatienStore";
import { Link } from "react-router-dom";

const PatientList: React.FC = () => {
  const patientStore = useContext(PatienStore);

  const { patientsByDate, submitting, deletePatient, target } = patientStore;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Date Joined</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {patientsByDate.map((patient) => (
          <Table.Row>
            <Table.Cell>{patient.patient_name}</Table.Cell>
            <Table.Cell>{patient.date}</Table.Cell>
            <Table.Cell>
              <Button
                as={Link}
                to={`/patients/${patient.id}`}
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
export default observer(PatientList);
