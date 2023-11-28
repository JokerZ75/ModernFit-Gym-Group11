const formatDayMonth = (d: Date) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if (day < 10) {
    return `0${day}/${month}`;
  }
  if (month < 10) {
    return `${day}/0${month}`;
  }
  return `${day}/${month}`;
};

const formatHourMinute = (d: Date) => {
  const date = new Date(d);
  const hour = date.getHours();
  const minute = date.getMinutes();
  if (minute < 10) {
    return `${hour}:0${minute}`;
  }
  if (hour < 10) {
    return `0${hour}:${minute}`;
  }
  return `${hour}:${minute}`;
};

export { formatDayMonth, formatHourMinute };
