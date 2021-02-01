"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShift = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("id");
exports.generateShift = (now) => {
    now = moment_1.default(now, "HH:mm");
    const shifts = [
        {
            name: "shift 1",
            start: moment_1.default("06:30", "HH:mm"),
            end: moment_1.default("14:29", "HH:mm")
        },
        {
            name: "shift 2",
            start: moment_1.default("14:30", "HH:mm"),
            end: moment_1.default("22:29", "HH:mm")
        },
        {
            name: "shift 3",
            start: moment_1.default("22:30", "HH:mm"),
            end: moment_1.default("06:30", "HH:mm")
        }
    ];
    return shifts.filter(({ start, end, name }) => {
        if (now >= start && now <= end) {
            return true;
        }
        if ((now >= start && now <= moment_1.default("24:00", "HH:mm")) || (now <= end && now >= moment_1.default("00:00", "HH:mm"))) {
            if (name === "shift 3") {
                return true;
            }
        }
        return false;
    })[0].name;
};
