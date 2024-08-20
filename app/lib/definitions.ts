export type PatientTable = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    image_url: string;
    age: number;
  };

export type DoctorTable = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    image_url: string;
    ref: string;
  };