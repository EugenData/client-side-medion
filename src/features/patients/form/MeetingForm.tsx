import React, { useState, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { IMeeting, MeetingFormValues } from "../../../app/models/patient";
import TextInput from "../../../app/common/form/TextInput";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import { TextField } from "@material-ui/core";

// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';

//Globalize.locale('ru')

//globalizeLocalizer()

const validate = combineValidators({
  titel: isRequired({ message: "Name must be fulfield!" }),
});

const MeetingForm: React.FC = () => {
  const [dateAndTime, setDate] = useState<string>();

  const handeleDate = (e: any) => {
    setDate(e.target.value);
  };
  const finaleFormSubmit = (values: any) => {
    const { date, ...meeting } = values;

    meeting.date = dateAndTime;

    // please don't judge me, i've spend 12h on solving this shit :/
    if (values.meetingId) {
      meeting.id = values.meetingId;
    } else {
      meeting.id = values.id;
    }

    if (!meeting.id) {
      let newMeeting: IMeeting = {
        ...meeting,

        meetingId: uuid(),
      };
      createMeeting(newMeeting);
      openCreateForm();
    } else {
      editMeeting(meeting);
    }
  };

  const rootStore = useContext(RootStoreContext);

  const {
    submitting,
    createMeeting,
    editMeeting,
    openCreateForm,
  } = rootStore.patientStore;

  const [meeting] = useState(new MeetingFormValues());

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        onSubmit={finaleFormSubmit}
        initialValues={meeting}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              label={"Назначення"}
              placeholder="Назначення"
              name={"titel"}
              value={meeting.titel}
              component={TextInput}
            />

            <TextField
              fullWidth
              name="date"
              margin="dense"
              id="time"
              label="Дата"
              title="Дата"
              type="datetime-local"
              value={dateAndTime}
              onChange={handeleDate}
              required={true}
            />

            {/* <Field
                component={DateInput}
                placeholder="Дата"
                date={true}
                value={meeting.date}
                name="date"
                formatt="dd.MM.yy"
              />
             
              <Field
                component={DateInput}
                placeholder="Час"
                time={true}
                value={meeting.date}
                name="time"
              /> */}

            <Button
              loading={submitting}
              positive
              type="submit"
              content="Submit"
            />
          </Form>
        )}
      />
    </Segment>
  );
};
export default observer(MeetingForm);
