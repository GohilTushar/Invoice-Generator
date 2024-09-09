import { Formik, Form } from "formik";
import CustomField from "./CustomField";
import toast, { Toaster } from "react-hot-toast";
import {
  InitialValues,
  updateInitialValues,
  ValidationSchema,
} from "../service/ValidationSchema";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  deleteItem,
  getInvoice,
  getItem,
  invoiceCreation,
  invoiceUpdate,
  itemCreation,
} from "../service/Apis";
import PropTypes from "prop-types";
import FilterDropdown from "./Filter";
const InvoiceModal = ({ isOpen, onClose, id }) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(null);
  const [finalCost, setFinalCost] = useState(0);

  useEffect(() => {
    if (id !== "") getOneInvoice();
  }, [id]);

  const getOneInvoice = async () => {
    try {
      const response = await axios.get(`${getInvoice}/${id}`);
      if (!response) return;
      updateInitialValues.addressFrom = response.data.addressFrom;
      updateInitialValues.addressTo = response.data.addressTo;
      updateInitialValues.billFrom = response.data.billFrom;
      updateInitialValues.billTo = response.data.billTo;
      updateInitialValues.emailFrom = response.data.emailFrom;
      updateInitialValues.emailTo = response.data.emailTo;
      setFinalCost(response.data.finalCost);
      sessionStorage.setItem("update", JSON.stringify(updateInitialValues));
      const itemByInvoiceResponse = await axios.get(`${getItem}/${id}`);
      setItems(itemByInvoiceResponse.data.itemList);
    } catch (error) {
      console.log("Error in getting one Invoice.", error);
    }
  };

  const handleFilterChange = (value) => {
    setStatus(value);
  };

  let total = 0;
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setItems(newItems);
    if (name === "itemUnit" || name === "itemPrice") {
      const unit = parseFloat(newItems[index].itemUnit) || 0;
      const unitPrice = parseFloat(newItems[index].itemPrice) || 0;
      total = unit * unitPrice;
      newItems[index].itemTotal = total.toFixed(2);
    }
    setTimeout(() => {
      setFinalCost(finalCost + total);
    }, 2000);
  };

  const handleAddRow = () => {
    setItems([
      ...(items || []),
      { itemName: "", itemPrice: "", itemUnit: "", itemTotal: "" },
    ]);
  };

  const handleSave = async (values) => {
    try {
      const initialValue = 0;

      const checkCost = items.reduce((accumulator, currentValue) => {
        console.log(typeof currentValue.itemTotal);
        return accumulator + parseFloat(currentValue.itemTotal);
      }, initialValue);

      setFinalCost(checkCost);

      const finalValue = {
        ...values,
        status,
        finalCost,
      };

      console.log(finalValue, "invc");

      let response;
      let itemResponse;
      if (status == null) {
        toast.error("Please select the filter");
        return;
      }
      if (items.length == 0) {
        toast.error("Please add the item");
        return;
      }
      if (id === "") {
        response = await axios.post(invoiceCreation, finalValue);
        const finalItem = items.map((item) => {
          return {
            ...item,
            invoiceId: response.data.data.id,
          };
        });
        itemResponse = await axios.post(itemCreation, finalItem);
        console.log(finalItem, "fitms");
      } else {
        response = await axios.put(`${invoiceUpdate}/${id}`, finalValue);
        const finalUpdatedItem = items.map((item) => {
          return {
            itemName: item.itemName,
            itemUnit: parseFloat(item.itemUnit),
            itemPrice: parseFloat(item.itemPrice),
            itemTotal: parseFloat(item.itemTotal),
            invoiceId: response.data.data[1][0].id,
          };
        });
        setTimeout(async () => {
          itemResponse = await axios.post(itemCreation, finalUpdatedItem);
        }, 1000);
        console.log(itemResponse);
        const deleted = await axios.delete(`${deleteItem}/${id}`);
        console.log(deleted);
        console.log(finalUpdatedItem, "fuitms");
      }
      if (response) {
        toast.success(response.data.message);
        setItems(itemResponse?.data.data);
        onClose();
      }
      setItems([]);
      setFinalCost(0);
      console.log(response);
      console.log(itemResponse);
    } catch (error) {
      if (error) toast.error(error.response.data.message);
      console.log("Error saving invoice.", error);
    } 
  };

  const itemDeletion = async (idx, item) => {
    try {
      setItems(
        items.filter((_, index) => {
          setFinalCost(finalCost - item.itemTotal);
          return index !== idx;
        })
      );
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <Toaster />
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
        <Formik
          enableReinitialize
          initialValues={
            id !== ""
              ? JSON.parse(sessionStorage.getItem("update"))
              : InitialValues
          }
          validationSchema={ValidationSchema}
          onSubmit={handleSave}
        >
          {() => (
            <Form className="p-6">
              <>
                <div className="mt-4 flex justify-end space-x-2">
                  <FilterDropdown onFilterChange={handleFilterChange} />
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    onSubmit={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {id == "" ? "Save" : "Update"}
                  </button>
                </div>
                <CustomField
                  label="From Email address"
                  name="emailFrom"
                  type="email"
                />

                <CustomField label="From Bill" name="billFrom" type="text" />

                <CustomField
                  label="From Address"
                  name="addressFrom"
                  type="text"
                />

                <CustomField
                  label="To Email address"
                  name="emailTo"
                  type="email"
                />

                <CustomField label="To Bill" name="billTo" type="text" />

                <CustomField label="To Address" name="addressTo" type="text" />
              </>

              <table className="w-full mb-4 border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Item Name</th>
                    <th className="border border-gray-300 p-2">Unit</th>
                    <th className="border border-gray-300 p-2">Unit Price</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full focus:outline-none border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          name="itemUnit"
                          value={item.itemUnit}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full focus:outline-none border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          name="itemPrice"
                          value={item.itemPrice}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full focus:outline-none border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          name="itemTotal"
                          value={item.itemTotal}
                          className="w-full focus:outline-none border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="text-center p-5 border">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => {
                            itemDeletion(index, item);
                          }}
                        >
                          <i className="fa-solid fa-trash mx-1 text-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <td colSpan={4} className="p-5 border text-end">
                    {finalCost}
                  </td>
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Item
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

InvoiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default InvoiceModal;
