import { Features } from "../features/common/featuresEnum";

export const featureMapper: Record<Features, string> = {
  [Features.CUSTOMER_MANAGEMENT]: "Gestão de Clientes",
  [Features.STOCK_MANAGEMENT]: "Gestão de Estoque",
  [Features.STOCK_ALERTS]: "Alertas de Estoque",
  [Features.CATEGORY_MANAGEMENT]: "Gestão de Categorias",
  [Features.SALES_MANAGEMENT]: "Gestão de Vendas",
  [Features.FINANCIAL_DASHBOARD]: "Dashboard Financeiro",
  [Features.SALES_REPORTS]: "Relatório de Vendas",
  [Features.UPLOAD_PRODUCTS_EXCEL]: "Upload de Produtos via Excel",
};
