import { Features } from "../features/common/featuresEnum";

export const featureMapper: Record<Features, string> = {
  [Features.FINANCIAL_DASHBOARD]: "Dashboard Financeiro",
  [Features.SALES_REPORTS]: "Relatório de Vendas",
  [Features.UPLOAD_PRODUCTS_EXCEL]: "Upload de Produtos via Excel",
};
