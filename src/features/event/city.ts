import { nanoid } from "@reduxjs/toolkit";

type City = {
  id: string;
  postCode?: string;
  name: string;
};

type Cities = {
  postCodes: {
    [postCode: string]: Array<string>;
  };
  cities: {
    [id: string]: City;
  };
};

const _cities: Array<City> = [
  { id: nanoid(), postCode: "12130", name: "LA CAPELLE BONANCE" },
  { id: nanoid(), postCode: "12130", name: "PIERREFICHE" },
  { id: nanoid(), postCode: "12140", name: "CAMPOURIEZ" },
  { id: nanoid(), postCode: "12140", name: "ENTRAYGUES SUR TRUYERE" },
  { id: nanoid(), postCode: "12140", name: "FLORENTIN LA CAPELLE" },
  { id: nanoid(), postCode: "12140", name: "LE FEL" },
  { id: nanoid(), postCode: "12140", name: "ST HIPPOLYTE" },
  {
    id: nanoid(),
    postCode: "12150",
    name: "SEVERAC D AVEYRON - RECOULES PREVINQUIERES",
  },
  {
    id: nanoid(),
    postCode: "12150",
    name: "SEVERAC D AVEYRON - LAPANOUSE",
  },
  {
    id: nanoid(),
    postCode: "12150",
    name: "SEVERAC D AVEYRON - BUZEINS",
  },
  { id: nanoid(), name: "Autre" },
];

export const CITIES: Cities = {
  postCodes: _cities.reduce(
    (storage: { [key: string]: Array<string> }, x: City) => {
      const group = x.postCode;
      if (group !== undefined) {
        storage[group] = storage[group] || [];
        storage[group].push(x.id);
      }
      return storage;
    },
    {}
  ),
  cities: _cities.reduce((storage: { [id: string]: City }, x: City) => {
    storage[x.id] = x;
    return storage;
  }, {}),
};
