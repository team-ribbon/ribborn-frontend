const TimeCalculator = (time) => {
  const now = new Date();
  const currentTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const current = currentTime.toISOString();
  const timeDifference = Date.parse(current) - Date.parse(time);
  if (timeDifference >= 31536000000) {
    return parseInt(timeDifference / 31536000000) + "년 전";
  }
  if (timeDifference >= 2678400000) {
    return parseInt(timeDifference / 2635200000) + "달 전";
  }
  if (timeDifference >= 2592000000) {
    if (
      currentTime.getMonth() === 4 ||
      currentTime.getMonth() === 6 ||
      currentTime.getMonth() === 9 ||
      currentTime.getMonth() === 11
    ) {
      if (currentTime.getDate() < 31) {
        return "1달 전";
      }
    }
  }
  if (timeDifference >= 2419200000) {
    if (currentTime.getMonth() === 2) {
      if (currentTime.getDate() < 29) {
        return "1달 전";
      }
    }
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
  if (timeDifference < -300000) {
    return "에러";
  }

  return "방금 전";
};

export default TimeCalculator;
