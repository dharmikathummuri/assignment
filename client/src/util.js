export const formatPhone = number => {
  let formattedNumber = null;
  let numberTemp = number.replace(/[^\d]/g, "");
  var splitNumber = numberTemp.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (splitNumber) {
    formattedNumber =
      "(" + splitNumber[1] + ") " + splitNumber[2] + "-" + splitNumber[3];
    return formattedNumber;
  }
  return number;
};

export const formatName = name => {
  let formattedName = name.replace(/[^\w]/g, " ");
  return formattedName;
};
