import React from "react";
import { Outlet } from "react-router-dom";
import { Features } from "../features/common/featuresEnum";
import { useFeatures } from "../app/featuresProvider";
import FeatureNotAllowed from "../app/components/billingWarn/featureNotAllowed";
import { featureMapper } from "../utils/featuresMapper";

interface RequireFeatureProps {
  feature: Features;
  children?: React.ReactNode;
}

export const RequireFeature = ({ feature, children }: RequireFeatureProps) => {
  const features = useFeatures();

  const allowed = !!features[feature];

  if (!allowed) {
    return <FeatureNotAllowed data={{ featureName: featureMapper[feature] }} />;
  }

  if (children) return <>{children}</>;

  return <Outlet />;
};

export default RequireFeature;
