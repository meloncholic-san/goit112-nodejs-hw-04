import { ContactColection } from "../models/contacts.js";

export const getAllContacts = async () => {
  const contacts = await ContactColection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactColection.findById(contactId);
  return contact;
};

export const createContact = async (newContact) => {
  const contact = await ContactColection.create(newContact);
  return contact;
}

export const updateContact = async (contactId, payload) => {
  const contact = await ContactColection.findByIdAndUpdate(contactId, payload, { new: true });
  return contact;
}

export async function replaceContact(contactId, contact) {
  const result = await ContactColection.findByIdAndUpdate(contactId, contact, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export const deleteContact = async(contactId) => {
  const contact = await ContactColection.findByIdAndDelete(contactId);
  return contact;
}