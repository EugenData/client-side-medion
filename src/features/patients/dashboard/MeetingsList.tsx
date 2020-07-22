import React from "react";
import { Segment, Table, Header } from "semantic-ui-react";
import { IMeeting } from "../../../app/models/patient";

interface IProps {
  meetings: IMeeting[];
}

export const MeetingsList: React.FC<IProps> = ({ meetings }) => {
  return (
    <Segment>
      <Table basic='very' celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Titel</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {meetings.map((meeting) => (
        <Table.Body >
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content >
                  {meeting.titel}
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell >{meeting.date}</Table.Cell>
          </Table.Row>
          </Table.Body>
      ))}
      </Table>
    </Segment>
  );
};
