import { _Categories } from "../util/type";

export enum threshold {
  increment = "increment",
  decrement = "decrement",
  valid = "valid",
  invalid = "invalid",
  validKod = "valid-kod",
  invalidKod = "invalid-kod",
  validName = "valid-name",
  invalidName = "invalid-name",
  validFile = "valid-file",
  invalidFile = "invalid-file",
  validKategori = "valid-kategori",
  invalidKategori = "invalid-kategori",
  resetAll = "reset-all",
}
interface Iinitialstate {
  valid: boolean;
  kod: boolean | undefined;
  name: boolean | undefined;
  file: boolean | undefined;
  kategori: boolean | undefined;
  kodValue: string;
  nameValue: string;
  fileValue: any;
  kategoriValue: _Categories | undefined;
  checked: number;
  error: string | undefined;
}

export type ACTIONTYPE =
  | { type: threshold.valid }
  | { type: threshold.invalid }
  | { type: threshold.validKod; payload: string }
  | { type: threshold.invalidKod }
  | { type: threshold.validName; payload: string }
  | { type: threshold.invalidName }
  | {
      type: threshold.validKategori;
      payload: { categories: _Categories; checked: number };
    }
  | { type: threshold.invalidKategori }
  | { type: threshold.validFile; payload: File }
  | { type: threshold.invalidFile; payload?: string }
  | { type: threshold.resetAll };

export const initialState: Iinitialstate = {
  valid: false,
  kod: undefined,
  name: undefined,
  file: undefined,
  kategori: undefined,
  kodValue: "",
  nameValue: "",
  fileValue: null,
  kategoriValue: undefined,
  checked: 0,
  error: undefined,
};
export const validateReducer = (
  state: typeof initialState,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case threshold.invalid:
      return { ...state, valid: false };
    case threshold.valid:
      return { ...state, valid: true };
    case threshold.invalidFile:
      return { ...state, file: false, error: action.payload };
    case threshold.validFile:
      return {
        ...state,
        file: true,
        error: undefined,
        fileValue: action.payload,
      };
    case threshold.invalidKod:
      return { ...state, kod: false };
    case threshold.validKod:
      return { ...state, kod: true, kodValue: action.payload };
    case threshold.validName:
      return { ...state, name: true, nameValue: action.payload };
    case threshold.invalidName:
      return { ...state, name: false };
    case threshold.invalidKategori:
      return { ...state, kategori: false };
    case threshold.validKategori:
      return {
        ...state,
        kategori: true,
        kategoriValue: action.payload.categories,
        checked: action.payload.checked,
      };
    case threshold.valid:
      return { ...state, valid: true };
    case threshold.resetAll: {
      return { ...initialState };
    }
    default:
      throw new Error();
  }
};
