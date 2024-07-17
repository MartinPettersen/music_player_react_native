
const getSeconds = (milliseconds: number) => {
    return Math.round(milliseconds / 1000);
  };

  const formattStartingZero = (timeUnit: number) => {
    if (timeUnit < 10) {
      return `0${timeUnit}`;
    }
    return timeUnit;
  };

  const getMinuttes = (seconds: number) => {
    const rest = seconds % 60;

    return `${formattStartingZero(Math.floor(seconds / 60))}:${formattStartingZero(rest)}`;
  };

export const getTimeFormatted = (milliseconds: number) => {
    return getMinuttes(getSeconds(milliseconds));
  };