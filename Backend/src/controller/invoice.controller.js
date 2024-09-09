import {
  allInvoices,
  existanceOfInvoice,
  invoiceCreation,
  invoiceDelete,
  invoiceUpdate,
} from "../service/invoice.service.js";
import Item from "../model/item.model.js";
import { message, pageConstant } from "../config/message.constant.js";

const { invoiceRelated, common } = message;

const createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    const searchQuery = {
      where: { emailTo: invoiceData.emailTo },
    };
    const invoiceExist = await existanceOfInvoice(searchQuery);

    if (invoiceExist) {
      return res
        .status(409)
        .json({ message: invoiceRelated.error.invoiceExisted, data: [] });
    }

    const generatedInvoice = await invoiceCreation(invoiceData);

    return res
      .status(201)
      .json({
        message: invoiceRelated.success.invoiceCreated,
        data: generatedInvoice,
      });
  } catch (err) {
    if (err) return res.status(400).json(err);
    return res.status(500).json(common.serverError);
  }
};

const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const searchQuery = {
      where: { id },
      include: {
        model: Item,
        as: "items",
      },
    };
    const invoiceToBeShown = await existanceOfInvoice(searchQuery);

    if (!invoiceToBeShown)
      return res.status(400).json(invoiceRelated.error.invoiceNotExisted);

    return res.status(200).json(invoiceToBeShown);
  } catch (err) {
    if (err) return res.status(400).json(err);
    return res.status(500).json(common.serverError);
  }
};

const invoiceList = async (req, res) => {
  try {
    const {
      page = pageConstant.page,
      limit = pageConstant.limit,
      sortField = null,
      sortOrder = "asc",
      status=null
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const searchQuery = {
      where:{},
      offset,
      limit: limitNumber,
      include: {
        model: Item,
        as: "items",
      },
      group: ["id"],
    };
    if (sortField) {
        searchQuery.order = [[sortField, sortOrder]];
    }
    
    if (status) {
      searchQuery.where.status = status;
    }    

    const { rows: invoices, count: totalInvoices } = await allInvoices(
      searchQuery
    );

    if (!totalInvoices.length)
      return res.status(400).json(invoiceRelated.error.invoiceNotExisted);

    const totalPages = Math.ceil(totalInvoices.length / limitNumber);

    if (pageNumber > totalPages)
      return res.status(400).json(common.exceedLimit);

    return res.status(200).json({
      invoiceList: invoices,
      pagination: {
        count: totalInvoices.length,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (err) {
    if (err) return res.status(400).json(err);
    return res.status(500).json(common.serverError);
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const newUpdatedData = req.body;


    const updatedInvoice = await invoiceUpdate(newUpdatedData, id);

    return res.status(200).json({
      message: invoiceRelated.success.invoiceUpdated,
      data: updatedInvoice,
    });
  } catch (err) {
    if (err) return res.status(400).json(err);
    return res.status(500).json(common.serverError);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const searchQuery = {
      where: { id },
    };

    const invoiceToBeDeleted = await existanceOfInvoice(searchQuery);
    if (!invoiceToBeDeleted)
      return res.status(400).json(invoiceRelated.error.invoiceNotExisted);

    await invoiceDelete(searchQuery);
    return res.status(200).json(invoiceRelated.success.invoiceDeleted);
  } catch (err) {
    if (err) return res.status(400).json(err);
    return res.status(500).json(common.serverError);
  }
};

export { createInvoice, getInvoice, updateInvoice, invoiceList, deleteInvoice };
