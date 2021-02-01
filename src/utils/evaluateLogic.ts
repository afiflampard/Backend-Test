export const evaluateLogic = (operator1: number, operand: string, operator2: number) => {
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