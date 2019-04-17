export default (state = {}, action) => {
  console.log("action", action);
  switch (action.type) {
    case "get_all_contacts":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
