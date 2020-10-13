import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IPatient, IMeeting } from "../models/patient";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class PatientStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable patientRegistry = new Map();
  @observable patient: IPatient | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable editMode = false;
  @observable search = "";

  @observable selectedMeeting: IMeeting | undefined;
  @observable meetingRegistry = new Map();

  // @computed get  searchPatient (){
  //   return Array.from(this.patientRegistry.values()).filter((patient:IPatient) =>
  //     patient.patient_name.toLocaleLowerCase().includes("Avram")
  // }

  @computed get patientsByDate() {
    return Array.from(this.patientRegistry.values()).sort((d) =>
      Date.parse(d.date.toISOString().split("T")[0])
    );
  }
  @action setSearch = async (s: string) => {
    this.search = s;
  };

  @action loadPatients = async () => {
    this.loadingInitial = true;
    try {
      const patients = await agent.Patients.list();
      runInAction("loading patient", () => {
        patients.forEach((patient) => {
          patient.date = new Date(patient.date);
          patient.meetings.map((met) => {
            met.date = new Date(met.date);
            return this.meetingRegistry.set(met.meetingId, met);
          });
          this.patientRegistry.set(patient.id, patient);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load patient error", () => {
        this.loadingInitial = false;
      });
    }
  };
  @action clearPatient = () => {
    this.patient = null;
  };
  @action loadPatient = async (id: string) => {
    let patient = this.getPatient(id);
    if (patient) {
      this.patient = patient;
      return patient;
    } else {
      this.loadingInitial = true;
      try {
        patient = await agent.Patients.details(id);
        runInAction("getting patient", () => {
          patient.date = new Date(patient.date);
          this.patient = patient;
          this.patient?.meetings.map((meeting) => {
            meeting.date = new Date(meeting.date);
          });

          this.loadingInitial = false;
        });
        return patient;
      } catch (error) {
        runInAction("get patient error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getPatient = (id: string) => {
    return this.patientRegistry.get(id);
  };

  @action createPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.create(patient);
      runInAction(() => {
        this.patientRegistry.set(patient.id, patient);
        this.submitting = false;
      });
      toast.success("Данні збережено вірно!");
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("Помилка");
    }
  };

  @action editPatient = async (patient: IPatient) => {
    this.submitting = true;
    try {
      await agent.Patients.update(patient);
      runInAction(() => {
        this.patientRegistry.set(patient.id, patient);
        this.patient = patient;
        this.submitting = false;
      });
      toast.success("Пацієнт відредаговано !");
    } catch (error) {
      console.log(error);
      toast.error("Помилка при редагуванні");
    }
  };

  @action setEditMode = () => {
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
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
      runInAction(() => {
        this.patientRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });

      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = !this.editMode;
    this.selectedMeeting = undefined;
  };
  @action openEditForm = (meet: IMeeting) => {
    this.editMode = true;
    this.selectedMeeting = meet;
  };

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Patients.meetingCreate(meeting, this.patient?.id!);
      runInAction(() => {
        this.patient?.meetings.push(meeting);
        this.patientRegistry.set(this.patient!.id, this.patient);
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
      });
    }
  };
  @action deleteMeeting = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    try {
      await agent.Patients.meetingDelete(id);
      runInAction(() => {
        if (this.patient) {
          this.patient.meetings = this.patient?.meetings.filter(
            (met) => met.meetingId !== id
          );
          this.patientRegistry.set(this.patient.id, this.patient);
        }
        this.submitting = false;
        toast.success("deleted");
      });
    } catch (e) {
      console.log(e);
      toast.error("Problem cancelling attendance");
    }
  };
  @action editMeeting = async (meeting: IMeeting) => {
    this.submitting = true;

    if (meeting.meetingId) {
      var objIndex = this.patient?.meetings.findIndex(
        (obj) => obj.meetingId === meeting.meetingId
      );
      this.patient!.meetings[objIndex!].titel = meeting.titel;
    }
    try {
      await agent.Patients.meetingUpdate(meeting);

      runInAction(() => {
        this.patientRegistry.set(this.patient!.id, this.patient);
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
      });
    }
  };
}
