export interface IPatient{
    id:string;
    patient_name:string;
    date:string;
    meetings:IMeeting[]
}
export interface IMeeting{
    id:string;
    titel:string;
    date:Date;
    isDone:boolean;
}
