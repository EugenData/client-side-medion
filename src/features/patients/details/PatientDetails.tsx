import React, { useContext, useEffect } from "react";
import {
  Segment,
  Item,
  Container,
  Header,
  Divider,
  Icon,
} from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { L10n } from "@syncfusion/ej2-base";
import square from '../../../app/assets/square-image.png';

import { loadCldr } from "@syncfusion/ej2-base";
import * as EJ2_LOCALE from "../../../../node_modules/@syncfusion/ej2-locale/src/ru.json";

L10n.load({ ru: EJ2_LOCALE.ru });

loadCldr(
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/ru/ca-gregorian.json"),
  require("cldr-data/main/ru/numbers.json"),
  require("cldr-data/main/ru/timeZoneNames.json")
);

interface DetailParams {
  id: string;
}

const PatientDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { patient, loadPatient, loadingInitial } = rootStore.patientStore;

  const alt: number = new Date().getFullYear() - patient?.date.getFullYear()!;

  

  useEffect(() => {
    loadPatient(match.params.id);
  }, [loadPatient, match.params.id, history]);


  if (loadingInitial || !patient) return <LoadingComponent />;

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
  return (
   <div> 
     
      <Segment clearing >
        <Header
          size="small"
          floated="right"
          color="orange"
          as={Link}
          to={`/manage/${patient.id}`}
          
        >
          <Icon size="small" name="edit" />
          Редагувати
        </Header>
        
        <Container>
          <Header as="h1">
            {patient.patient_name + " " + patient.patient_surname}
          </Header>
        </Container>
        <Divider/>
        <Container>
            <Item>
              <Item.Image className="detailsImage"
                src={square}
                size="small"
                circular
              />
              <Item.Content >
                <Item.Meta>
                  <span className="altt">{alt} лет </span>
                  <span className="f">
                    {format(new Date(patient.date), "dd.MM.yyyy")}
                  </span>
                  <br />
                  <Icon color="green" name="phone square" />
                  <span>{patient.phone}</span>
                </Item.Meta>
              </Item.Content>
            </Item>
            
        </Container>
        
        </Segment>
        <Segment>
        <Container >
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
export default observer(PatientDetails);
