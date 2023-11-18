const formatDayMonth = (d: Date) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth();
  return `${day}/${month}`;
};

const formatHourMinute = (d: Date) => {
  const date = new Date(d);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
};

export { formatDayMonth, formatHourMinute };
