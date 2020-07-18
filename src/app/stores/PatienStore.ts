import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IPatient } from "../models/patient";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class PatientStore {
  @observable patientRegistry = new Map();
  @observable patients: IPatient[] = [];
  @observable selectedPatient: IPatient | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get patientsByDate() {
    return Array.from(this.patientRegistry.values()).sort(
      (p, b) => Date.parse(p.date) - Date.parse(b.date)
    );
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

  @action selectPatient = (id: string) => {
    this.selectedPatient = this.patientRegistry.get(id);
    this.editMode = false;
  };

  @action createPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.create(patient);
      runInAction(()=>{
        this.patientRegistry.set(patient.id, patient);
        this.editMode = false;
        this.submitting = false;
      })
      
    } catch (error) {
        runInAction(()=>{
            this.submitting = false;
        })
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedPatient = undefined;
  };

  @action editPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.update(patient);
      runInAction(()=>{
        this.patientRegistry.set(patient.id, patient);
        this.selectedPatient = patient;
        this.editMode = false;
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
  @action openEditForm = (id: string) => {
    this.selectedPatient = this.patientRegistry.get(id);
    this.editMode = true;
  };
  @action cancelEditMode = () => {
    this.editMode = false;
  };
}
export default createContext(new PatientStore());
