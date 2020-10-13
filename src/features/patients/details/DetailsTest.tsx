import { Day, Inject, Month, ScheduleComponent, Week } from "@syncfusion/ej2-react-schedule";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps,Link } from "react-router-dom";
import {
  Label,
  Segment,
  Header,
  Icon,
  Container,
  Item,
  Divider,
} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
    id: string;
  }

const DetailsTest: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history,
  }) => {
    const rootStore = useContext(RootStoreContext);
    const { patient, loadPatient, loadingInitial } = rootStore.patientStore;

  useEffect(() => {
    loadPatient(match.params.id);
  }, [loadPatient, match.params.id, history]);

  const data = [{}];
  patient?.meetings.map((meeting) =>
    data.push(
      {
        Id: meeting.meetingId,
        Subject: meeting.titel,
        StartTime: new Date(meeting.date),
        EndTime: new Date(meeting.date),
      }
    )
  );

  if (loadingInitial) return <LoadingComponent />;
  if (!patient) return <h2>Activity not found</h2>;

  return (
    <div>
      <Segment>
        <Header size="tiny" floated="right" color="green">
          <Icon size="tiny" name="edit" as={Link}  to={`/manage/${patient.id}`} />
          Редагувати
        </Header>

         <Container>
          <Header as="h1">
          {patient.patient_name + " " + patient.patient_surname}
          </Header>

          <Item>
            
              <Item.Image
                src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                size="small"
                circular
              />
              <Item.Content>
                <Item.Meta>
                  
                  <span className="f">
                    {format(new Date(patient.date), "dd.MM.yyyy")}
                  </span>
                  <br />
                  <br />
                  <Icon color="green" name="phone square" />
                  <span>{patient.phone}</span>
                </Item.Meta>
              </Item.Content>
           
          </Item>
        </Container>

        <Container>
          <Header as="h3">Назначенные приемы</Header>
          <ScheduleComponent
            locale="ru"
            width="100%"
            height="400px"
            readonly
            dateFormat="dd.MM.yyyy"
            eventSettings={{ dataSource: data }}
          >
            
            <Inject services={[Day, Week, Month]} />
          </ScheduleComponent>
        </Container>
       </Segment>
    </div>
  );
};
export default observer(DetailsTest);
