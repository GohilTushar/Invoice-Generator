const message = {
  invoiceRelated: {
    success: {
      invoiceCreated: "Invoice Created Successfully",
      invoiceUpdated: "Invoice updated Successfully",
      invoiceDeleted: "Invoice Deleted Successfully",
    },
    error: {
      invoiceExisted: "Invoice Already Exist",
      invoiceNotExisted: "Invoice Not Exist",
    },
  },
  itemRelated: {
    success: {
      itemCreated: "item Created Successfully",
      itemUpdated: "item updated Successfully",
      itemDeleted: "item Deleted Successfully",
    },
    error: {
      itemExisted: "item Already Exist",
      itemNotExisted: "item Not Exist",
      uploadTypeError: "Images Only!",
    },
  },
  common: {
    exceedLimit: "Page number cannot be greater than total pages",
    serverError: "Internal Server Error",
  },
};
const pageConstant = {
  page: 1,
  limit: 5,
};

export { message ,pageConstant};
