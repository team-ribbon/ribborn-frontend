import moment from "moment";

const TimeCalculator = (time) => {
  const timeToFormat = time.split("T")[0] + "" + time.split("T")[1];
  const inputTime = moment(timeToFormat, "YYYY-MM-DD HH:mm:ss").add(9, "hours");
  if (moment().diff(inputTime, "years") > 0) {
    return moment().diff(inputTime, "years") + "년 전";
  }
  if (moment().diff(inputTime, "months") > 0) {
    return moment().diff(inputTime, "months") + "달 전";
  }
  if (moment().diff(inputTime, "days") > 0) {
    return moment().diff(inputTime, "days") + "일 전";
  }
  if (moment().diff(inputTime, "hours") > 0) {
    return moment().diff(inputTime, "hours") + "시간 전";
  }
  if (moment().diff(inputTime, "minutes") > 0) {
    return moment().diff(inputTime, "minutes") + "분 전";
  }
  if (moment().diff(inputTime, "hours") < -1) {
    return "에러";
  }

  return "방금 전";
};

export default TimeCalculator;
