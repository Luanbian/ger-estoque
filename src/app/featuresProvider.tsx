import React, { createContext, useContext } from "react";
import { Features } from "../features/common/featuresEnum";

export type FeaturesRecord = Record<Features, string | boolean | number>;

const FeaturesContext = createContext<FeaturesRecord | null>(null);

export const FeaturesProvider = ({
  value,
  children,
}: {
  value: FeaturesRecord;
  children: React.ReactNode;
}) => {
  return (
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  const ctx = useContext(FeaturesContext);
  if (!ctx) {
    throw new Error("useFeatures must be used within a FeaturesProvider");
  }
  return ctx;
};

export default FeaturesContext;
