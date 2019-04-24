export default (state = {}, action) => {
  switch (action.type) {
    case "get_all_contacts":
      return action.payload;
    default:
      return state;
  }
};
