const TimeCalculator = (time) => {
  const current = new Date().toUTCString();
  console.log(Date.parse(current));
  console.log(Date.parse(time));
  const timeDifference = Date.parse(current) - Date.parse(time);
  console.log(timeDifference);
  if (timeDifference >= 31536000000) {
    return parseInt(timeDifference / 31536000000) + "년 전";
  }
  if (timeDifference >= 2678400000) {
    return parseInt(timeDifference / 2678400000) + "달 전";
  }
  if (timeDifference >= 86400000) {
    return parseInt(timeDifference / 86400000) + "일 전";
  }
  if (timeDifference >= 3600000) {
    return parseInt(timeDifference / 3600000) + "시간 전";
  }
  if (timeDifference >= 60000) {
    return parseInt(timeDifference / 60000) + "분 전";
  }
  if (timeDifference < 0) {
    return "에러";
  }

  return "방금 전";
};

export default TimeCalculator;
