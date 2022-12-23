const replaceDifference = (difference) => {
    return difference === 0
      ? "Сегодня"
      : difference === 1
      ? "Вчера"
      : difference > 1
      ? `${difference} дня назад`
      : null;
  };
  
  export const formatDate = (date) => {
    let orderDate = new Date(date);
    const difference = new Date().getDate() - orderDate.getDate();
    const differenceToString = replaceDifference(difference);
    const hours =
      orderDate.getHours() > 9
        ? `${orderDate.getHours()}`
        : `0${orderDate.getHours()}`;
    const minutes =
      orderDate.getMinutes() > 9
        ? `${orderDate.getMinutes()}`
        : `0${orderDate.getMinutes()}`;
    return `${differenceToString}, ${hours}:${minutes} i-GMT+${
      -orderDate.getTimezoneOffset() / 60
    }`;
  };