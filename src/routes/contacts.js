import express from 'express';
import {getContactsCtrl, getContactByIdCtrl, createContactCtrl, updateContactCtrl, deleteContactCtrl, replaceContactCtrl} from "../controllers/contacts.js"
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsCtrl));
router.get('/:id', ctrlWrapper(getContactByIdCtrl));
router.post('/', jsonParser, ctrlWrapper(createContactCtrl));
router.patch("/:id", jsonParser, ctrlWrapper(updateContactCtrl));
router.delete("/:id", ctrlWrapper(deleteContactCtrl));
router.put("/:id", jsonParser, ctrlWrapper(replaceContactCtrl));

export default router;