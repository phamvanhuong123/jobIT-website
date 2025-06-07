interface Company {
  _id: String;
  name: string;
  logo: string;
  address: string;
  infor: {
    model: string;
    industry: string;
    country: string;
    workingDay: string;
    size: number;
  };
  contactEmail: string;
  contactPhone: string;
  keySkills: string[];
  description: string;
  whyLove: string[];
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
