"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateLogic = void 0;
exports.evaluateLogic = (operator1, operand, operator2) => {
    switch (operand) {
        case "=":
            return operator1 == operator2;
        case "<=":
            return operator1 <= operator2;
        case ">=":
            return operator1 >= operator2;
        case ">":
            return operator1 > operator2;
        case "<":
            return operator1 < operator2;
    }
};
