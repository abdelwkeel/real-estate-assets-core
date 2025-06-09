// types.ts
export type Company = {
  CompanyID: number;
  CompanyName: string;
  AffiliationLaw: string;
};
export type Letter = {
  LetterID: number;
  Subject: string;
  RecipientType: string;
  RecipientName: string;
  DateSent: string;
  OutgoingNumber: string;
  AttachedFiles: string[];
};
