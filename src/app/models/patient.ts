import { runInAction } from "mobx";

export interface IPatient {
  id: string;
  patient_name: string;
  patient_surname:string;
  phone:string;
  date: Date;
  meetings: IMeeting[];
}
export interface IMeeting {
  meetingId: string;
  titel: string;
  date: Date;
  isDone: boolean;
  description:string;
}
//______________________________________________________________
export interface IMeetingFormValues extends Partial<IMeeting> {
  time?: Date;
}
export class MeetingFormValues implements IMeetingFormValues {
  meetingId?: string = undefined;
  titel: string = "";
  date?: Date = undefined;
  isDone: boolean = false;

}

//_______________________________________________________________
export interface IPatientsFormValues extends Partial<IPatient> {
  time?: Date;
}
export class PatientFormValues implements IPatientsFormValues {
  id?: string = undefined;
  patient_name: string = "";
  patient_surname: string = "";
  phone:string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  meetings: IMeeting[] = [];

  constructor(init?: IPatientsFormValues) {
    runInAction(()=>{
      if (init && init.date) {
        init.time = init.date;
      }
      
    })
    Object.assign(this, init);
  }
}
