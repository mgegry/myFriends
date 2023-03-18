class DateUtils {
  getDateAndTime(value) {
    value = new Date(value);

    var minutes = value.getMinutes().toString();
    var hours = value.getHours().toString();

    if (value.getMinutes().toString().length === 1) {
      minutes = "0" + minutes;
    }

    if (value.getHours.toString().length === 1) {
      hours = "0" + hours;
    }

    const postedAt =
      hours +
      ":" +
      minutes +
      " " +
      value.getDate().toString() +
      "/" +
      value.getMonth().toString() +
      "/" +
      value.getFullYear().toString();

    return postedAt;
  }

  getDate(value) {
    value = new Date(value);

    const postedAt =
      value.getDate().toString() +
      "/" +
      value.getMonth().toString() +
      "/" +
      value.getFullYear().toString();

    return postedAt;
  }
}

const dateUtils = new DateUtils();

export default dateUtils;
