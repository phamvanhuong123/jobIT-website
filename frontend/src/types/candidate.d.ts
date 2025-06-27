 interface Project {
  name: string;
  description: string;
}

 interface Education {
  schoolName: string;
  major: string;
  isCurrentlyStudying: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
}

 interface WorkExperience {
  jobTitle: string;
  company: string;
  isCurrentlyWorking: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
  projects: Project[];
}

 interface TechnicalSkill {
  name: string;
  experience: string;
}

 interface Skill {
  technicalSkill: TechnicalSkill[];
  softSkill: string[];
}

 interface Language {
  name: string;
  level: string;
}

export interface ICandidate {
  email : String
  fullName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  currentLevel : String;
  
  experienceYears : Number;
  personalLink: string;
  workTypes : [String],
  locations : [],
  about: string;
  education: Education;
  workExperience: WorkExperience;
  skills: Skill[];
  languages: Language[];
  certifications: string[];
  idAccount: string;
  createdAt?: Date;
  updatedAt?: Date;
}