import axios from "axios";

export const getContacts = async () => {
  let allContacts = await axios.get("http://localhost:4000/contacts");
  return allContacts.data.contacts;
};
