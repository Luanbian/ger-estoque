export interface CatalogCategory {
  _id: string;
  tenantId: string;
  name: string;
  fatherCategoryId?: string;
}

export interface CatalogItem {
  _id?: string;
  tenantId: string;
  showcaseId: string;
  title: string;
  description?: string;
  image?: string;
  categoryId?: string;
  pricing?: {
    basePriceInCents: number;
    finalPriceInCents?: number;
    discount?: {
      type: "percentage" | "fixed";
      value: number;
    };
    installments?: {
      maxInstallments: number;
      installmentPriceInCents: number;
      interestFree: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CatalogCategoryState {
  data: {
    category: CatalogCategory[] | null;
    items: CatalogItem[] | null;
  };
  loading: boolean;
  error: string | null;
}

export interface CatalogCategoryPayload {
  name: string;
}

export interface CatalogItemPayload {
  showcaseId: string;
  title: string;
  description?: string;
  image?: File;
  categoryId?: string;
  pricing?: {
    basePriceInCents: number;
    finalPriceInCents?: number;
    discount?: {
      type: "percentage" | "fixed";
      value: number;
    };
    installments?: {
      maxInstallments: number;
      installmentPriceInCents: number;
      interestFree: boolean;
    };
  };
}

export interface CatalogCategoryAssociate {
  categoryId: string;
  fatherCategoryId: string;
}
