"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./_date"), exports);
__exportStar(require("./getDate"), exports);
__exportStar(require("./getTimeLeft"), exports);
__exportStar(require("./secondsToTime"), exports);
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
