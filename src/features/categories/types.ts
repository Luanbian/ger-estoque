export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  fatherCategoryId: string | null;
  displayOrder: number;
  tenantId: string;
}

export interface CategoryState {
  data: Category[] | null;
  loading: boolean;
  error: string | null;
}
