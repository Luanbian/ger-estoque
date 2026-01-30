import { Features } from "../features/common/featuresEnum";

export const generateBasicPlanFeatures = (): Record<
  Features,
  string | boolean | number
> => {
  return {
    FINANCIAL_DASHBOARD: false,
    SALES_REPORTS: false,
    UPLOAD_PRODUCTS_EXCEL: false,
    CUSTOMER_MANAGEMENT: false,
  };
};
