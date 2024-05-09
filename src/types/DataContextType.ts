import { IPanData } from "./IPanData";

export type DataContextType = {
  panProData: IPanData;
  updatePanProData: (data: IPanData) => void;
  saveIds: (
    applicationId: string,
    userId: string,
    loanAmount: string,
    mobileNumber: string
  ) => void;
  userId: string;
  applicationId: string;
  loanAmount: string;
  mobileNumber: string;
};
