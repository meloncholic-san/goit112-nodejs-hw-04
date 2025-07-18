import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { getAllContacts, getContactById, createContact, updateContact, deleteContact, replaceContact} from "../services/contacts.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

    export async function getContactsCtrl(req, res) {
        const { page, perPage } = parsePaginationParams(req.query);
        const {sortBy, sortOrder} = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);
        console.log(req.query);
        const contacts = await getAllContacts({ 
            page,
            perPage,
            sortBy,
            sortOrder,
            filter
        });

        res.json({status: 200, data:contacts, message: "Successfully found contacts!"});
    }
    
    export async function getContactByIdCtrl(req, res) {
        const contactId = req.params.id;
        const contact = await getContactById(contactId);

        if(!contact) throw new createHttpError.NotFound('Contact not found');

        res.json({status: 200, data:contact, message: "Successfully found contact!"});
    }


    export async function createContactCtrl(req, res) {
        const payload = req.body;
        const newContact = await createContact(payload);
        res.status(201).json({status: 201, data: newContact, message: "Successfully created new contact!"});
    }

    export async function updateContactCtrl(req, res) {
        const payload = req.body;
        const contactId = req.params.id;
        const updatedContact = await updateContact(contactId, payload);

        if (!updatedContact) {
        throw new createHttpError.NotFound('Contact not found');
        }

        res.json({status: 200, data: updatedContact, message: "Successfully updated contact!"});
    }

    export async function deleteContactCtrl(req, res) {
        const contactId = req.params.id;
        const deletedContact = await deleteContact(contactId);
        if(!deletedContact) throw new createHttpError.NotFound('Contact not found');
        res.status(204).end();
    }


    export async function replaceContactCtrl(req, res) {
        const contactId = req.params.id;
        const payload = req.body;
        const { value, updatedExisting } = await replaceContact(contactId, payload);

        if (updatedExisting === true) {
            return res.json({
            status: 200,
            message: 'Contact updated successfully',
            data: value,
            });
        }

        res.status(201).json({
            status: 201,
            message: 'Contact created successfully',
            data: value,
        });
        }