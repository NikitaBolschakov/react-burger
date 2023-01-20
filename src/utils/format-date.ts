const getDiff = (diff: number) => {
  return diff === 0 ? "Сегодня" : diff === 1 ? "Вчера" : diff > 1 ? `${diff} дня назад` : null;
};

export const formatDate = (date: string) => {
  const orderTime = new Date(date);
  const diff = new Date().getDate() - orderTime.getDate();
  const diffToString = getDiff(diff);
  const hours = orderTime.getHours() > 9 ? `${orderTime.getHours()}` : `0${orderTime.getHours()}`;
  const minutes = orderTime.getMinutes() > 9 ? `${orderTime.getMinutes()}` : `0${orderTime.getMinutes()}`;
  return `${diffToString}, ${hours}:${minutes} i-GMT+${-orderTime.getTimezoneOffset() / 60}`;
};