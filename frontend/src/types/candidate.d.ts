
 interface Education {
  schoolName: string;
  major: string;

  startDate: Date;
  endDate: Date;
  description: string;
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
  id :String
  email : String
  fullName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city : String,
  currentLevel : String;
  
  experienceYears : Number;
  personalLink: string;
  workTypes : [String],
  locations : [],
  about: string;
  education: Education;

  skills: Skill[];
  languages: Language[];
 
  idAccount: string;
  createdAt?: Date;
  updatedAt?: Date;
}