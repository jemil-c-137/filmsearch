import { IPersonSelect } from "../../components/FormFields/MultiplePersonSelect";
import { FormFieldsValues_persons } from "../../interfaces/FormFieldsValues";
import { PersonOptionType } from "../../interfaces/types";

export const isPersonOptionType = (obj: FormFieldsValues_persons | IPersonSelect): obj is PersonOptionType => {
  return (obj as FormFieldsValues_persons).id === undefined;
};

export const isFormFieldPersonType = (obj: FormFieldsValues_persons | IPersonSelect): obj is FormFieldsValues_persons => {
  return (obj as FormFieldsValues_persons).id !== undefined;
};
