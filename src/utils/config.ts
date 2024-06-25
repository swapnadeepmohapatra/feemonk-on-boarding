export const MandateStatus = {
  NotInitiated: 1,
  Initiated: 2,
  Partial: 3,
  Successful: 4,
  Rejected: 5,
};

export const MandateStatusArray = [
  "",
  "Not Initiated",
  "Initiated",
  "Partial",
  "Successful",
  "Rejected",
];

export const AgreementStatus = {
  NotInitiated: 1,
  Initiated: 2,
  Signed: 3,
  Pending: 4,
  InvalidSignature: 5,
  Regenerate: 6,
  PendingCoapplicant: 7,
};

export const SelfieStatus = {
  NotInitiated: 1,
  Initiated: 2,
  Successful: 3,
  Failed: 4,
  Mismatch: 5,
};

export const BankVerificationStatus = {
  NotInitiated: 1,
  Successful: 2,
  Failed: 3,
};

export const DigilockerStatus = {
  NotInitiated: 1,
  Initiated: 2,
  Successful: 3,
  Failed: 4,
};

export const FacematchSource = {
  Digilocker: "Digilocker",
  Ckyc: "Ckyc",
};

export const AgreementStatusArray = [
  "",
  "Not Initiated",
  "Initiated",
  "Signed",
  "Pending",
];

export const SelfieStatusArray = [
  "",
  "Not Initiated",
  "Initiated",
  "Successful",
  "Failed",
];
