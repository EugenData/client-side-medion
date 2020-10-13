import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { PatientFormValues, IPatient } from "../../../app/models/patient";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextField from "@material-ui/core/TextField";
import MeetingForm from "./MeetingForm";
import MeetingListEdit from "./MeetingListEdit";
import { combineValidators, isRequired } from "revalidate";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Buttonn from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const validate = combineValidators({
  patient_name: isRequired({ message: "Name must be fulfield!" }),
  patient_surname: isRequired({ message: "Name must be fulfield!" }),
  
 
});

interface IProps {
  id: string;
}

const PatientsForm: React.FC<RouteComponentProps<IProps>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createPatient,
    editPatient,
    editMode,
    submitting,
    loadPatient,
    deletePatient
    
  } = rootStore.patientStore;

  const [patient, setPatient] = useState(new PatientFormValues());
  const [phone, setPhone] = useState<string>();
  const [materialTime, setTime] = useState<string>();

  const handleDateChange = (Date?: Date) => {
    if (Date) {
      if (!materialTime) {
        console.log("f" + Date);
        setTime(Date.toISOString().split("T")[0]);
      }
    }
  };

  useEffect(() => {
    if (match.params.id) {
      loadPatient(match.params.id).then((patient: IPatient) => {
        setPatient(new PatientFormValues(patient));
        handleDateChange(patient.date);
      });
    }
  }, [loadPatient, match.params.id]);

  const finaleFormSubmit = (values: any) => {
    //const dateAndTime = combineDateTime(values.date, values.time);
    const { date, ...patient } = values;
    if (phone) patient.phone = phone;
    if (materialTime) {
      patient.date = materialTime;
    }
    //patient.date = values.date;

    //console.log(patient.date);
    if (!patient.id) {
      let newPatient = {
        ...patient,
        id: uuid(),
      };
      createPatient(newPatient);
      history.push(`/patients/`)
    } else {
      editPatient(patient).then(() => history.push(`/patients/${patient.id}`));
    }
  };
  
  const dateHandler = (e: any) => {
    setTime(e.target.value);
  };

  //................

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment clearing>
          <FinalForm
            initialValues={patient}
            onSubmit={finaleFormSubmit}
            validate={validate}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  <Field
                    label="Ім'я"
                    placeholder="Ім'я"
                    name={"patient_name"}
                    value={patient.patient_name}
                    component={TextInput}
                  />
                  <Field
                    label="Прізвище"
                    placeholder="Прізвище"
                    name={"patient_surname"}
                    value={patient.patient_surname}
                    component={TextInput}
                  />
                </Form.Group>

                <Form.Field widths="3" name="phone" >
                  <label>Телефон</label>
                  <PhoneInput
                    country={"ua"}
                    onlyCountries={["ua", "at"]}
                    value={patient.phone}
                    placeholder="Phone"
                    onChange={(phone) => setPhone(phone)}
                  />
                </Form.Field>

                <TextField
                  name={"date"}
                  margin="dense"
                  id="time"
                  label="Дата народження"
                  title="Дата народження"
                  type="date"
                  value={materialTime}
                  onChange={dateHandler}
                  required
                />

                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={submitting || invalid}
                />
                <Button
                  floated="right"
                  negative
                  type="button"
                  content="Назад"
                  onClick={() => history.push("/patients")}
                />
                {match.params.id && (
                  <div>
                    <Buttonn
                      variant="outlined"
                      color="default"
                      onClick={handleClickOpen}
                    >
                      Видалити запис
                    </Buttonn>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Видалити запис пацієнта?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Цю дію не можна буде скасувати !
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Buttonn onClick={handleClose} color="primary">
                          Ні
                        </Buttonn>
                        <Buttonn
                          onClick={(e) =>
                            deletePatient(e, patient.id!).then(() => {
                              history.push("/patients");
                            })
                          }
                          color="primary"
                          autoFocus
                        >
                          Так
                        </Buttonn>
                      </DialogActions>
                    </Dialog>
                  </div>
                  // <Button
                  //   name={patient.id}
                  //   onClick={(e) =>
                  //     deletePatient(e, patient.id!).then(() => {
                  //       history.push("/patients");
                  //     })
                  //   }
                  //   floated="left"
                  //   content="Delete"
                  //   color="black"
                  // />
                )}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={10}>
        {match.params.id && <MeetingListEdit />}
      </Grid.Column>

      <Grid.Column width={6}>{editMode && <MeetingForm />}</Grid.Column>
    </Grid>
  );
};
export default observer(PatientsForm);
