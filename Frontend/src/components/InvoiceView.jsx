import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InvoiceModal from "./InvoiceForm";

const ViewModal = ({ show, invoice, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-10 z-10 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
          <div className="flex justify-between">
            <div className="flex items-center justify-start gap-3 mb-4">
              <button
                onClick={onClose}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md bg-blue-50"
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button
                className=" text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md bg-blue-50"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa-regular fa-pen-to-square"></i> Edit
              </button>
            </div>
            <p> invoice Id: #{invoice?.id}</p>
          </div>
          <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
          <div className="flex justify-around gap-32">
            <div className="flex flex-col">
              <h3 className="font-semibold">Order Status:</h3>
              <h6>{invoice?.status}</h6>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Order Date:</h3>
              <h6>{invoice?.createdAt}</h6>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="flex justify-around gap-96">
            <div className="mb-4">
              <h3 className="font-semibold">Bill From</h3>
              <p>{invoice?.billFrom}</p>
              <p>{invoice?.emailFrom}</p>
              <p>{invoice?.addressFrom}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Bill To</h3>
              <p>{invoice?.billTo}</p>
              <p>{invoice?.emailTo}</p>
              <p>{invoice?.addressTo}</p>
            </div>
          </div>
          <table className="w-full border-collapse border border-gray-200 mb-4">
            <thead>
              <tr>
                {/* <th className="border border-gray-300 p-2">Item ID</th> */}
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Unit</th>
                <th className="border border-gray-300 p-2">Unit Price</th>
                <th className="border border-gray-300 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items?.map((item, index) => (
                <tr key={index}>
                  {/* <td className="border border-gray-300 p-2">{item.id}</td> */}
                  <td className="border border-gray-300 p-2">
                    {item.itemName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.itemUnit}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.itemPrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.itemTotal}
                  </td>
                </tr>
              ))}
              <td colSpan={5} className="border text-end border-gray-300 p-2">
                {invoice.finalCost}
              </td>
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <InvoiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          id={invoice.id}
        />
      )}
    </>
  );
};

ViewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  invoice: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewModal;
