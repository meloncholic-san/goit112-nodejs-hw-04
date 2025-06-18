import { ContactColection } from "../models/contacts.js";

export const getAllContacts = async ({page, perPage, sortBy, sortOrder, filter}) => {
  const skip = page > 0 ? (page - 1) * perPage: 0;
  const contactsQuery = ContactColection.find();

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
    if (typeof filter.contactType !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  
   const [total, contacts] = await Promise.all([
    ContactColection.countDocuments(contactsQuery),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(total / perPage);
  return {
    data: contacts, 
    page, 
    perPage, 
    totalItem: total, 
    totalPages, 
    hasNextPage: totalPages > page, 
    hasPreviousPage: page > 1
  };
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