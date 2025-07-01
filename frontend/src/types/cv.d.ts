export {};
declare global {
  interface ICv {
    _id?: string;
    idJob: string;
    fullName: string;
    phone: string;
    locations: string[];
    coverLetter: string;
    cvUrl: string;
    isDisplay?: boolean;
    status?: "pending" | "accepted" | "rejected";
    createdAt?: Date;
    updatedAt?: Date;
  }
   interface JobSalary {
  min: number;
  max: number;
  currency: string;
}

 interface AppliedCv {
  _id: string;
  idUser: string;
  idJob: string;
  fullName: string;
  phone: string;
  locations: string[];
  status: "pending" | "accepted" | "rejected";
  jobName: string;
  jobSalary: JobSalary;
  companyName: string;
  createdAt : Date
  cvUrl : string
}

interface Applicant {
  _id: string;
  fullName: string;
  phone: string;
  locations: string[];
  cvUrl: string;
  status: "pending" | "accepted" | "rejected" | string;
  createdAt: string;
  nameJob: string;
  isRead: boolean;
}
}
