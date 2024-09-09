import * as Yup from "yup";

const InitialValues = {
  billFrom: "",
  emailFrom: "",
  addressFrom: "",
  billTo: "",
  emailTo: "",
  addressTo: "",
};
const updateInitialValues = {
  billFrom: "",
  emailFrom: "",
  addressFrom: "",
  billTo: "",
  emailTo: "",
  addressTo: "",
};
const ValidationSchema = Yup.object({
  billFrom: Yup.string().required("Bill From is required"),
  emailFrom: Yup.string()
    .email("Invalid email format")
    .required("Email From is required"),
  addressFrom: Yup.string().required("Address From is required"),

  billTo: Yup.string().required("Bill To is required"),
  emailTo: Yup.string()
    .email("Invalid email format")
    .required("Email To is required"),
  addressTo: Yup.string().required("Address To is required"),
});

export { InitialValues,updateInitialValues, ValidationSchema};
