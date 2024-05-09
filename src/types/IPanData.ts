export interface IPanData {
  application?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  email?: string;
  mobile?: string;
  panId?: string;
  aadhaarId?: string;
  currentAddress?: string;
  currentCity?: string;
  currentState?: string;
  currentPincode?: string;
  userId?: string;
  age?: number;
  cibil?: number;
  paymentHistory?: [
    {
      startDate?: string;
      endDate?: string;
    },
    {
      startDate?: string;
      endDate?: string;
    },
    {
      startDate?: string;
      endDate?: string;
    }
  ];
  currentOverdue?: boolean;
  defaults?: string[];
  SmaOrDbt?: boolean;
}
