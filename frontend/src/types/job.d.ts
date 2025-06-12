export {}
declare global{
  interface IJob {
  _id: string;
  idCompany: string;
  name: string;
  logo: string;
  level: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  nameCompany : String,
  logoCompany : String

  salary: {
    min: number;
    max: number;
    currency: string;
  };

  requirements: {
    degree: string[];
    softSkills: string[];
    technicalSkills: string[];
    advantages: string[];
  };

  skills: string[];
  locations: string[];
  workplace: string;
  jobDescription: string[];
}
}