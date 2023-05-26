export interface Country {
  code: string;
  prefix: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  {
    prefix: "51",
    name: "Peru",
    code: "PE",
  },
  {
    prefix: "54",
    name: "Argentina",
    code: "AR",
  },
  {
    prefix: "1",
    name: "United States",
    code: "US",
  },
];

export interface IPrefix {
  country: string;
  value: string;
}

type Prefixes = Record<string, IPrefix>;

export const prefixes: Prefixes = {
  "51": { country: "PE", value: "51" },
  "54": { country: "AR", value: "54" },
  "1": { country: "US", value: "1" },
};
