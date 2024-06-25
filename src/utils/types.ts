export interface MandateType {
  id?: number;
  userId?: string;
  applicationId?: string;
  mobile?: string;
  otp?: string;
  bankVerificationStatus?: number;
  enachStatus?: number;
  agreementStatus?: number;
  selfieStatus?: number;
  kycDone?: boolean;
  digilockerStatus?: number;
  createdAt?: string;
  updatedAt?: string;
  isCoapplicant?: boolean;
}
