export default (state = {}, action) => {
  switch (action.type) {
    case "get_all_contacts":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
