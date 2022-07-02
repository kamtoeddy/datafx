export function addMinutes(date: Date, minutes: number = 1) {
  return new Date(new Date(date).getTime() + minutes * 60000);
}

export function isDateAfter(date: Date, refDate: Date, minsOfTolerance = 0) {
  return (
    new Date(date).getTime() > addMinutes(refDate, minsOfTolerance).getTime()
  );
}
