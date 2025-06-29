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
}
