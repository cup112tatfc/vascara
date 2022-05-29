export type City = {
  id: string;
  code: string;
  name: string;
  districts: District[];
};

export type District = {
  id: string;
  name: string;
  wards: Ward[];
  streets: street[];
  projects: project[];
};
export type Ward = {
  id: string;
  name: string;
  prefix: string;
};
export type street = {
  id: string;
  name: string;
  prefix: string;
};
export type project = {
  id: string;
  name: string;
  lat: string;
  lng: string;
};
export type typeAddressAll = {
  id: string;
  name: string;
  wards: Ward[];
  streets: street[];
  projects: project[];
}