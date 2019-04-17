export const allContacts = data => {
  try {
    return { type: "get_all_contacts", payload: data };
  } catch (e) {
    console.error(e);
  }
};
