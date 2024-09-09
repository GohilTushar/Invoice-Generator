const baseUrl = `http://localhost:3030/api`;

const invoiceCreation = `${baseUrl}/invoice/create`;
const getInvoice = `${baseUrl}/invoice/get`;
const invoiceUpdate = `${baseUrl}/invoice/update`;
const invoiceDelete = `${baseUrl}/invoice/delete`;
const itemCreation = `${baseUrl}/item/create`;
const deleteItem = `${baseUrl}/item/delete`;
const getItem = `${baseUrl}/item/get`;


export {
  invoiceCreation,
  getInvoice,
  invoiceUpdate,
  invoiceDelete,
  itemCreation,
  deleteItem,
  getItem,
};
