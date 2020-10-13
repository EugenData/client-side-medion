import React, { useContext } from "react";
import { Table, Icon, Label } from "semantic-ui-react";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

// interface IProps {
//   patient: IPatientsFormValues;
// }

const MeetingListEdit: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openCreateForm, deleteMeeting, patient } = rootStore.patientStore;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Назва</Table.HeaderCell>
          <Table.HeaderCell>Дата </Table.HeaderCell>
          <Table.HeaderCell>Дата </Table.HeaderCell>
          <Table.HeaderCell>
            <Label as='a' basic content="Додати назначення" color='green'  onClick={() => openCreateForm()}>
           
            
            </Label>
           
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {patient?.meetings &&
          patient!.meetings!.map((meeting) => (
            <Table.Row key={meeting.meetingId}>
              <Table.Cell>{meeting.titel}</Table.Cell>
              <Table.Cell>
                {format(new Date(meeting.date), "dd.MM.yy")}
              </Table.Cell>
              <Table.Cell>
                {format(new Date(meeting.date), "HH:mm")}
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name="delete"
                  onClick={(e:React.SyntheticEvent<HTMLButtonElement>) => {
                    deleteMeeting(e, meeting.meetingId);
                  }}
                  floated="left"
                  content="Delete"
                  color='red'
                  alt={"g"}
                />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
export default observer(MeetingListEdit);
