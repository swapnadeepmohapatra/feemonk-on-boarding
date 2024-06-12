import { createContext, useEffect, useState } from "react";
import { DataContextType } from "../../types/DataContextType";
import { IPanData } from "../../types/IPanData";

export const DataContext = createContext<DataContextType | null>(null);

function getStorageValue(key: string, defaultValue: string) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(() => {
    return getStorageValue("fmk_data", "{}");
  });

  const [data, setData] = useState<IPanData>({});

  const { userId, applicationId, loanAmount, mobileNumber } = value;

  useEffect(() => {
    localStorage.setItem("fmk_data", JSON.stringify(value));
  }, [value]);

  const updatePanProData = (data: IPanData) => {
    setData(data);
  };

  const saveIds = (
    applicationId: string,
    userId: string,
    loanAmount: string,
    mobileNumber: string
  ) => {
    setValue({
      applicationId,
      userId,
      loanAmount,
      mobileNumber,
    });
  };

  return (
    <DataContext.Provider
      value={{
        panProData: data,
        updatePanProData,
        saveIds,
        userId,
        applicationId,
        loanAmount,
        mobileNumber,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
