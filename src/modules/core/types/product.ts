export interface Produto {
  id: string;
  name: string;
  credits: number;
  validity: string;
  type: string;
  price: number;
  active: boolean;
  status: "active" | "inactive" | "pending";
  usageLimitPeriod: string;
  visibility: string;
  purchaseLimit: number;
  createdAt: string;
  updatedAt: string;
  recurring: boolean;
  validityDays: number;
  value: number;
}

export interface ProductCreateDTO {
  productTypeId: number;
  name: string;
  description: string;
  credits: number;
  value: number;
  validityDays: number;
  recurring: boolean;
}

export interface ProductType {
  id: number;
  name: string;
}
