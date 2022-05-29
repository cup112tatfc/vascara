import React from 'react';
import { RegisterDatatype, RegisterErrors, User } from 'types/type.auth';
import { Validate } from 'utils/errorsForm/validate';


export const submitForm = (
  formValues: RegisterDatatype,
  formErrors: RegisterErrors,
  setOberror: React.Dispatch<React.SetStateAction<RegisterErrors>>,
  DataCheckEmail: Object,
  DataCheckphoneNumber: object,
  setCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setOberror(Validate(formValues));

  if (
    formValues.email &&
    formValues.phoneNumber &&
    formValues.password &&
    formValues.conFpassword &&
    formValues.username &&
    !formErrors.email &&
    !formErrors.phoneNumber &&
    !formErrors.password &&
    !formErrors.conFpassword &&
    !formErrors.username
  ) {
    if (
      Object.keys(DataCheckEmail).length !== 0 ||
      Object.keys(DataCheckphoneNumber).length !== 0
    ) {
      setCheck(false);
      console.log('errors');
    } else {
      setCheck(true);
    }
  }
};


