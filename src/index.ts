export * from "./arrays";
export * from "./numbers";
export * from "./objects";
export * from "./optimizers";
export * from "./time";
export * from "./toBase64";
export * from "./utils";

// export const getPeriod = ({
//   start = new Date(),
//   stop,
//   distance = 1,
//   useDistance = false,
// }) => {
//   let otherTime;

//   if (!start && useDistance) {
//     otherTime = new Date(getDateString(stop || new Date()));
//     start = new Date(otherTime.getTime() - distance * 24 * 60 * 60 * 1000);
//   }

//   if (!stop && useDistance) {
//     otherTime = new Date(getDateString(start));
//     stop = new Date(otherTime.getTime() + distance * 24 * 60 * 60 * 1000);
//   }

//   return {
//     start: new Date(getDateString(start)),
//     stop: new Date(getDateString(stop)),
//   };
// };
