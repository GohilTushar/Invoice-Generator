import Item from "../model/item.model.js";

const existanceOfItem = async (searchQuery) => {
  try {
    return await Item.findAll(searchQuery);
  } catch (err) {
    return err;
  }
};

const itemCreation = async (itemData) => {
    try {
      return await Item.bulkCreate(itemData);
    } catch (err) {
      return err;
    }
  };
  const itemDelete = async (searchQuery) => {
    try {
      return await Item.destroy(searchQuery);
    } catch (err) {
      return err;
    }
  };
  const allItem=async()=>{
    try {
      return Item.findAll()
    } catch (err) {
      return err;
    }
  }
  const itemByInvoice=async(searchQuery)=>{
    try {
      return Item.findAll(searchQuery)
    } catch (err) {
      return err;
    }
  }
  
export {itemCreation,itemDelete,existanceOfItem,allItem,itemByInvoice}