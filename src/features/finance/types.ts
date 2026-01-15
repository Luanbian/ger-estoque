import { StockStatusEnum } from "../common/stockStatusEnum";

export interface FinancePerProduct {
  productId: string;
  productName: string;
  marginGross: number;
  valueOfStock: number;
  potentialSalesOfStock: number;
  potentialGrossProfitOfStock: number;
  markup: number;
  isBelowIdealMarkup: boolean;
}

export interface FinanceStock {
  stockConcentration: {
    productId: string;
    productName: string;
    stockValue: number;
    cumulativePercentage: number;
  }[];
  totalStock: number;
  stockZeroOrLow: {
    productId: string;
    productName: string;
    status: StockStatusEnum;
  };
}

export interface FinanceAggregate {
  averageStockMargin: number;
  totalPotentialProfit: number;
  immobilizedCapital: number;
}

export interface FinanceDashboardResponse {
  perProduct: {
    data: FinancePerProduct[];
  };
  stock: {
    data: FinanceStock;
  };
  aggregate: {
    data: FinanceAggregate;
  };
}

export interface FinanceState {
  data: {
    stock: FinanceStock | null;
    perProduct: FinancePerProduct[] | [];
    aggregate: FinanceAggregate | null;
  };
  loading: boolean;
  error: string | null;
}
