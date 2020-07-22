import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IPatient } from "../models/patient";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class PatientStore {
  @observable patientRegistry = new Map();
  @observable patient: IPatient | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get patientsByDate() {
   return this.splitDate(Array.from(this.patientRegistry.values()));
  }
  splitDate(patients:IPatient[]){
     const sortedPatients = patients.sort(
      (p, b) => Date.parse(p.date) - Date.parse(b.date)
    );
    const date = sortedPatients.sort(d => Date.parse(d.date.split('T')[0]))
   
    return date;
  }

  @action loadPatients = async () => {
    this.loadingInitial = true;

    try {
      const patients = await agent.Patients.list();
      runInAction(()=>{
        patients.forEach((patient) => {
            patient.date = patient.date.split(".")[0];
            this.patientRegistry.set(patient.id, patient);
      });
        this.loadingInitial = false;
      })
      
    } catch (error) {
        runInAction(()=>{
            this.loadingInitial = false;
        })
    }
  };
  @action clearPatient=()=>{
    this.patient = null;
  }
  @action loadPatient = async (id: string) => {
    let patient = this.getPatient(id);
    if (patient) {
      this.patient = patient;
    } else {
      this.loadingInitial = true;
      try {
        patient = await agent.Patients.details(id);
        runInAction('getting patient',() => {
          this.patient = patient;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get patient error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  };
  
  getPatient = (id:string)=>{
    return this.patientRegistry.get(id);
  }

  @action createPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.create(patient);
      runInAction(()=>{
        this.patientRegistry.set(patient.id, patient); 
        this.submitting = false;
      })
      
    } catch (error) {
        runInAction(()=>{
            this.submitting = false;
        })
    }
  };



  @action editPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.update(patient);
      runInAction(()=>{
        this.patientRegistry.set(patient.id, patient);
        this.patient = patient;  
        this.submitting = false;
      })
     
    } catch (error) {
      console.log(error);
    }
  };
  @action deletePatient = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Patients.delete(id);
      runInAction(()=>{
        this.patientRegistry.delete(id);
      this.submitting = false;
      this.target = "";
      })
      
    } catch (error) {
        runInAction(()=>{
            this.submitting = false;
            this.target = "";
        })
     
      console.log(error);
    }
  };

}
export default createContext(new PatientStore());
