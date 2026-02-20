export interface CompanyBrand {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  secondaryLogo: string;
}

export interface CompanyConfig {
  id: string;
  companyName: string;
  brand: CompanyBrand;
  companyType: "fit" | "clinic" | "both";
}

export const companyConfig: CompanyConfig = {
  id: "tennisUp",
  companyName: "TennisUp",
  brand: {
    primaryColor: "142 70% 45%",
    secondaryColor: "174 60% 40%",
    logo: "",
    secondaryLogo: "",
  },
  companyType: "clinic",
};
