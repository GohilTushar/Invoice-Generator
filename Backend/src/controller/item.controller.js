import { message } from "../config/message.constant.js";
import { allItem, existanceOfItem, itemByInvoice, itemCreation, itemDelete } from "../service/item.service.js";
const { itemRelated, common } = message;

const createItem = async (req, res) => {
    try {
      const itemData = req.body;

      console.log(itemData);
      
      const generatedItem=await itemCreation(itemData);
      
      return res.status(201).json({message:itemRelated.success.itemCreated,data:generatedItem});
    } catch (err) {
      if (err) return res.status(400).json(err);
      return res.status(500).json(common.serverError);
    }
  };

  const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        
        const searchQuery={
          where: {
            invoiceId:id
            }
        }
        const itemToBeDeleted = await existanceOfItem(searchQuery);
        if (!itemToBeDeleted) return res.status(400).json(itemRelated.error.itemNotExisted);

      const deletedItem=await itemDelete(searchQuery);
      return res.status(200).json({message:itemRelated.success.itemDeleted,data:deletedItem});

    } catch (err) {
      if (err) return res.status(400).json(err);
      return res.status(500).json(common.serverError);
    }
  };

 
  const itemList = async (req, res) => {
    try {
     
      const items= await allItem();
  
      if (items.length == 0) return res.status(404).json(itemRelated.error.itemNotExisted);
  
      return res.status(200).json({
        itemList: items,
      });
    } catch (err) {
      if(err)return res.status(400).json(err); 
      return res.status(500).json(common.serverError);
    }
  };
  const getItemByInvoice = async (req, res) => {
    try {
     
      const {id}=req.params
      const searchQuery={
        where: {
          invoiceId:id
          }
      }

      const items= await itemByInvoice(searchQuery);
  
      if (items.length == 0) return res.status(404).json(itemRelated.error.itemNotExisted);
  
      return res.status(200).json({
        itemList: items,
      });
    } catch (err) {
      if(err)return res.status(400).json(err); 
      return res.status(500).json(common.serverError);
    }
  };
  export {createItem,deleteItem,itemList,getItemByInvoice}