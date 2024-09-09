import Invoice from "../model/invoice.model.js";

const existanceOfInvoice = async (searchQuery) => {
  try {
    return await Invoice.findOne(searchQuery);
  } catch (err) {
    return err;
  }
};

const invoiceCreation = async (invoiceData) => {
  try {
    return await Invoice.create({
      ...invoiceData,
    });
  } catch (err) {
    return err;
  }
};

const invoiceUpdate = async (newData, id) => {
  try {
    return await Invoice.update(
      { ...newData },
      { where: { id }, individualHooks: true }
    );
  } catch (err) {
    return err;
  }
};

const invoiceDelete = async (searchQuery) => {
  try {
    return await Invoice.destroy(searchQuery);
  } catch (err) {
    return err;
  }
};

const allInvoices=async(searchQuery)=>{
  try {
    return Invoice.findAndCountAll(searchQuery)
  } catch (err) {
    return err;
  }
}
export { existanceOfInvoice, invoiceCreation, invoiceUpdate , invoiceDelete , allInvoices };
