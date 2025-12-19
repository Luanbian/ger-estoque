export interface Category {
  _id: string;
  name: string;
  slug: string;
  tenantId: string;
  description: string | null;
  fatherCategoryId: string | null;
  displayOrder: number;
  subCategories?: Category[];
}

export interface CategoryState {
  data: Category[] | null;
  loading: boolean;
  error: string | null;
}
