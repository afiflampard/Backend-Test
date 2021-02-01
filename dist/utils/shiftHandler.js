"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyTime = exports.getShiftTime = exports.SHIFT = exports.formatShiftDate = exports.generateShift = void 0;
const moment_1 = __importDefault(require("moment"));
exports.generateShift = (time, plant = "ciracas") => {
    const now = moment_1.default(time, "HH:mm");
    const shiftCiracas = [
        {
            name: 1,
            start: moment_1.default("06:30", "HH:mm"),
            end: moment_1.default("14:29", "HH:mm")
        },
        {
            name: 2,
            start: moment_1.default("14:30", "HH:mm"),
            end: moment_1.default("22:29", "HH:mm")
        },
        {
            name: 3,
            start: moment_1.default("22:30", "HH:mm"),
            end: moment_1.default("06:29", "HH:mm")
        }
    ];
    const shiftSentul = [
        {
            name: 1,
            start: moment_1.default("07:00", "HH:mm"),
            end: moment_1.default("14:59", "HH:mm")
        },
        {
            name: 2,
            start: moment_1.default("15:00", "HH:mm"),
            end: moment_1.default("22:59", "HH:mm")
        },
        {
            name: 3,
            start: moment_1.default("23:00", "HH:mm"),
            end: moment_1.default("06:59", "HH:mm")
        }
    ];
    const SHIFT = (plant == "ciracas" ? shiftCiracas : shiftSentul);
    return SHIFT.filter(({ start, end, name }) => {
        if (now >= start && now <= end) {
            return true;
        }
        if ((now >= start && now <= moment_1.default("24:00", "HH:mm")) ||
            (now <= end && now >= moment_1.default("00:00", "HH:mm"))) {
            if (name === 3) {
                return true;
            }
        }
        return false;
    })[0].name;
};
exports.formatShiftDate = (date, plant = "ciracas") => {
    const startShiftOneCiracas = "06:30";
    const startShiftOneSentul = "07:00";
    const startShiftOne = (plant == "ciracas" ? startShiftOneCiracas : startShiftOneSentul);
    const tgl = moment_1.default(date, "YYYY-MM-DD HH:mm:SS");
    const jam = moment_1.default(tgl.format("HH:mm"), "HH:mm");
    if (jam > moment_1.default("00:00", "HH:mm") && jam < moment_1.default(startShiftOne, "HH:mm")) {
        return tgl.subtract(1, "days").toDate();
    }
    else {
        return date.toDate();
    }
};
exports.SHIFT = {
    CIRACAS: {
        "SHIFT 1": ["06:30:00", "07:30:00", "08:30:00", "09:30:00", "10:30:00", "11:30:00", "12:30:00", "13:30:00", "14:29:59"],
        "SHIFT 2": ["14:30:00", "15:30:00", "16:30:00", "17:30:00", "18:30:00", "19:30:00", "20:30:00", "21:30:00", "22:29:59"],
        "SHIFT 3": ["22:30:00", "23:30:00", "00:30:00", "01:30:00", "02:30:00", "03:30:00", "04:30:00", "05:30:00", "06:29:59"]
    },
    SENTUL: {
        "SHIFT 1": ["07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "14:59:59"],
        "SHIFT 2": ["15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "22:59:59"],
        "SHIFT 3": ["23:00:00", "00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "06:59:59"]
    }
};
exports.getShiftTime = (plantName, shiftList) => {
    let startTime, endTime = null;
    const shiftNow = exports.generateShift(moment_1.default().format("HH:mm"), plantName.toLowerCase());
    if (shiftNow == 3) {
        if (moment_1.default() >= moment_1.default("00:00:00", "HH:mm:ss") &&
            moment_1.default() <= moment_1.default(shiftList[shiftList.length - 1], "HH:mm:ss")) {
            startTime = moment_1.default(shiftList[0], "HH:mm:ss").subtract(1, "days");
            endTime = moment_1.default(shiftList[shiftList.length - 1], "HH:mm:ss");
        }
        else {
            startTime = moment_1.default(shiftList[0], "HH:mm:ss");
            endTime = moment_1.default(shiftList[shiftList.length - 1], "HH:mm:ss").add(1, "days");
        }
    }
    else {
        startTime = moment_1.default(shiftList[0], "HH:mm:ss");
        endTime = moment_1.default(shiftList[shiftList.length - 1], "HH:mm:ss");
    }
    return { startTime, endTime };
};
exports.getDailyTime = (plantName, shiftList) => {
    let startTime, endTime = null;
    const shiftNow = exports.generateShift(moment_1.default().format("HH:mm"), plantName.toLowerCase());
    if (shiftNow == 3) {
        if (moment_1.default() >= moment_1.default("00:00:00", "HH:mm:ss") &&
            moment_1.default() <= moment_1.default(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss")) {
            startTime = moment_1.default(shiftList["SHIFT 1"][0], "HH:mm:ss").subtract(1, "days");
            endTime = moment_1.default(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss");
        }
        else {
            startTime = moment_1.default(shiftList["SHIFT 1"][0], "HH:mm:ss");
            endTime = moment_1.default(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss").add(1, "days");
        }
    }
    else {
        startTime = moment_1.default(shiftList["SHIFT 1"][0], "HH:mm:ss");
        endTime = moment_1.default(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss").add(1, "days");
    }
    return { startTime, endTime };
};
