import moment from "moment";

moment.locale("id");

export const generateShift = (now: moment.MomentInput): string => {
  now = moment(now, "HH:mm");
  const shifts = [
    {
      name: "shift 1",
      start: moment("06:30", "HH:mm"),
      end: moment("14:29", "HH:mm")
    },
    {
      name: "shift 2",
      start: moment("14:30", "HH:mm"),
      end: moment("22:29", "HH:mm")
    },
    {
      name: "shift 3",
      start: moment("22:30", "HH:mm"),
      end: moment("06:30", "HH:mm")
    }
  ];
  return shifts.filter(({ start, end, name }) => {
    // if jika shift 1 / 2
    if (now >= start && now <= end) {
      return true;
    }

    if ((now >= start && now <= moment("24:00", "HH:mm")) || (now <= end && now >= moment("00:00", "HH:mm"))) {
      if (name === "shift 3") {
        return true;
      }
    }
    return false;
  })[0].name;
};
