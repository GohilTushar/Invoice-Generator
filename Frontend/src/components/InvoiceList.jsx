import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getInvoice, invoiceDelete } from "../service/Apis";
import axios from "axios";
import DeleteConfirmationModal from "./Delete";
import ViewModal from "./InvoiceView";
import InvoiceModal from "./InvoiceForm";
import FilterDropdown from "./Filter";

const InvoiceList = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredData, setFilteredData] = useState(invoiceList);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteInvoice, setDeleteInvoice] = useState();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page, isModalOpen, sortField, sortOrder, status, viewModalOpen]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    const filtered = invoiceList.filter((invc) =>
      invc.billTo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(field);
    setPage(1);
  };

  const handleFilterChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const openViewModal = (invc) => {
    setSelectedInvoice(invc);
    setViewModalOpen(true);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getInvoice, {
        params: {
          page,
          limit: 5,
          sortField,
          sortOrder,
          status,
        },
      });
     

      setInvoiceList(response.data.invoiceList);
      setFilteredData(response.data.invoiceList);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      setInvoiceList([]);
      console.log("Error fetching leave status data", error);
    }
    setLoading(false);
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    const margin = 10;
    const logoWidth = 50;
    const logoHeight = 20;
    let y = margin;

    doc.addImage("/logo.png", "PNG", margin, margin, logoWidth, logoHeight);
    doc.text(
      `Invoice id: # ${invoice.id}`,
      doc.internal.pageSize.width - margin,
      y,
      {
        align: "right",
      }
    );
    y += logoHeight + 10;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(margin, y, doc.internal.pageSize.width - margin, y);
    y += 10;
    const senderInfo = [
      `Name: ${invoice.billFrom}`,
      `Email: ${invoice.emailFrom}`,
      `Address: ${invoice.addressFrom}`,
    ];
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(senderInfo, margin, y);

    const receiverInfo = [
      `Name: ${invoice.billTo}`,
      `Email: ${invoice.emailTo}`,
      `Address: ${invoice.addressTo}`,
    ];
    doc.text(receiverInfo, doc.internal.pageSize.width - margin, y, {
      align: "right",
    });
    y += receiverInfo.length * 10;

    const invoiceDetails = [
      `Invoice Date: ${invoice.createdAt}`,
      `Status: ${invoice.status}`,
    ];
    doc.text(invoiceDetails, margin, y);
    y += invoiceDetails.length * 10 + 20;

    doc.autoTable({
      head: [["Item Name", "Item Price", "Item Unit", "Item Total"]],
      body: invoice.items.map((item) => [
        item.itemName,
        item.itemPrice,
        item.itemUnit,
        item.itemTotal,
      ]),
      startY: y,
      headStyles: { fillColor: [100, 100, 255] },
      margin: { top: 0 },
      styles: { fontSize: 12 },
      theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Final Cost:", doc.internal.pageSize.width / 2 + margin, y);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${invoice.finalCost.toFixed(2)}`,
      doc.internal.pageSize.width / 2 + margin + 30,
      y
    );

    doc.save(`invoice_${invoice.id}.pdf`);
  };

  const handleDelete = (id) => {
    setDeleteInvoice(id);
    setIsModalVisible(true);
  };
  const handleDownload = (invc) => {
    generatePDF(invc);
  };

  const handleConfirmDelete = async () => {
    const id = deleteInvoice;

    console.log(id);

    try {
      const response = await axios.delete(`${invoiceDelete}/${id}`);
      setIsModalVisible(false);
      setInvoiceList((prevList) => prevList.filter((invc) => invc.id !== id));
      if (response) toast.success(response.data);
      console.log(response);
    } catch (error) {
      if (error) toast.error(error.response.data.message);
      console.log("Error", error);
    } finally {
      fetchData();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center gap-[790px]">
        <div className="p-2 m-3 rounded-md border-2 border-gray-300 overflow-hidden ">
          <input
            type="text"
            onChange={handleSearch}
            value={query}
            placeholder="Search Something..."
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
        </div>
        <div className="flex justify-center items-center gap-6">
          <FilterDropdown onFilterChange={handleFilterChange} />
          <button
            type="submit"
            className="btn-primary w-36 m-3"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Invoice
          </button>
          <InvoiceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            id={""}
          />
        </div>
      </div>

      <table className="w-full mx-auto bg-white border rounded-lg shadow-lg ">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th
              className="py-6 px-4 cursor-pointer border uppercase"
              onClick={() => handleSort("id")}
            >
              Id {sortField === "billFrom" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-6 px-4 cursor-pointer border uppercase"
              onClick={() => handleSort("billFrom")}
            >
              Bill From{" "}
              {sortField === "billFrom" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-6 px-4 cursor-pointer border uppercase"
              onClick={() => handleSort("billTo")}
            >
              Bill To{" "}
              {sortField === "billTo" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-6 px-4 cursor-pointer border uppercase"
              onClick={() => handleSort("finalCost")}
            >
              Cost{" "}
              {sortField === "finalCost" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="py-6 px-4 border uppercase">Status</th>
            <th className="py-6 px-4 border uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <td colSpan={9} className="p-5 border text-center">
              <Loader />
            </td>
          ) : filteredData.length > 0 ? (
            filteredData.map((invc) => (
              <tr
                key={invc.id}
                className="odd:bg-blue-50 even:bg-white hover:bg-indigo-100 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap border text-gray-700">
                  {invc.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border text-gray-700">
                  {invc.billFrom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border text-gray-700">
                  {invc.billTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border text-gray-700">
                  {invc.finalCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border text-center">
                  {invc.status === "Delivered" ? (
                    <button
                      disabled
                      className="inline-flex rounded-lg bg-green-200/50 px-3 py-1 text-sm font-medium text-green-400 cursor-not-allowed"
                    >
                      Delivered
                    </button>
                  ) : invc.status === "Shipped" ? (
                    <button
                      disabled
                      className="inline-flex rounded-lg bg-red-200/50 px-3 py-1 text-sm font-medium text-red-400 cursor-not-allowed"
                    >
                      Shipped
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex rounded-lg bg-yellow-200/50 px-3 py-1 text-sm font-medium text-yellow-400 cursor-not-allowed"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td className="p-5 border flex justify-center gap-4">
                  <button
                    onClick={() => openViewModal(invc)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <i className="fa-regular fa-eye mx-1 text-xl"></i>
                  </button>

                  <ViewModal
                    show={viewModalOpen}
                    invoice={selectedInvoice}
                    onClose={() => setViewModalOpen(false)}
                  />

                  <button
                    onClick={() => handleDelete(invc.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <i className="fa-solid fa-trash mx-1 text-xl"></i>
                  </button>
                  <DeleteConfirmationModal
                    show={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onConfirm={handleConfirmDelete}
                  />
                  <button
                    onClick={() => handleDownload(invc)}
                    className="text-green-500 hover:text-green-700 transition-colors"
                  >
                    <i className="fa-solid fa-download mx-1 text-xl"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <td colSpan={9} className="p-5 border text-center">
              No Data Founded
            </td>
          )}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default InvoiceList;
