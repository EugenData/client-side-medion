import React, { useContext } from "react";
import { Image, Segment, ItemGroup, Item, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Link } from "react-router-dom";
import stevie from '../../../app/assets/stevie.jpg';

const PatientList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { patientsByDate, search } = rootStore.patientStore;


  const filter = patientsByDate.filter((patient) => {
    return (patient.patient_name + patient.patient_surname)
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  const normalizedPhone = (phone: string) => {
    var cleaned = ("" + phone).replace(/\D/g, "");
    var match = cleaned.match(/^(38|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let intlCode = match[1] ? "38" : "";
      return intlCode + "(" + match[2] + ") " + match[3] + "-" + match[4];
    }
    return phone;
  };
  return (
    <Segment>
      <ItemGroup divided>
        <Item.Header as="h3">Пацієнти</Item.Header>
        {filter.map((patient) => (
          <Item key={patient.id}>
            <Image
              avatar
              src={stevie}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/patients/${patient.id}`}>
                {patient.patient_name + " " + patient.patient_surname}
              </Item.Header>
              <Item.Description>
                <Icon color="green" name="phone square" />
                {normalizedPhone(patient.phone)}
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
};
export default observer(PatientList);

  /* <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Date Joined</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {patientsByDate.map((patient) => (
          <Table.Row key={patient.patient_name} onClick={() => history.push(`/patients/${patient.id}`)}>
            <Table.Cell >
              {patient.patient_name + " " + patient.patient_surname}
            </Table.Cell>
            <Table.Cell>{format(patient.date, "dd.MM.yyyy")}</Table.Cell>
            <Table.Cell>{patient.phone}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table> */

