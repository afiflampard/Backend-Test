import moment, { Moment } from "moment";

/**
 * to generate shift with specified time and plant
 * @param time format HH:mm
 * @param plant
 */
export const generateShift = (time: string, plant = "ciracas"): number => {
  const now = moment(time, "HH:mm");
  const shiftCiracas = [
    {
      name: 1,
      start: moment("06:30", "HH:mm"),
      end: moment("14:29", "HH:mm")
    },
    {
      name: 2,
      start: moment("14:30", "HH:mm"),
      end: moment("22:29", "HH:mm")
    },
    {
      name: 3,
      start: moment("22:30", "HH:mm"),
      end: moment("06:29", "HH:mm")
    }
  ];
  const shiftSentul = [
    {
      name: 1,
      start: moment("07:00", "HH:mm"),
      end: moment("14:59", "HH:mm")
    },
    {
      name: 2,
      start: moment("15:00", "HH:mm"),
      end: moment("22:59", "HH:mm")
    },
    {
      name: 3,
      start: moment("23:00", "HH:mm"),
      end: moment("06:59", "HH:mm")
    }
  ];
  const SHIFT = (plant == "ciracas" ? shiftCiracas : shiftSentul);
  return SHIFT.filter(({ start, end, name }) => {
    // if jika shift 1 / 2
    if (now >= start && now <= end) {
      return true;
    }

    if ((now >= start && now <= moment("24:00", "HH:mm")) ||
      (now <= end && now >= moment("00:00", "HH:mm"))) {
      if (name === 3) {
        return true;
      }
    }
    return false;
  })[0].name;
};

/**
 * to reformat shift date 
 * @param date format YYYY-MM-DD HH:mm:ss
 * @param plant
 */
export const formatShiftDate = (date: moment.Moment, plant = "ciracas"): Date => {
  const startShiftOneCiracas = "06:30";
  const startShiftOneSentul = "07:00";
  const startShiftOne = (plant == "ciracas" ? startShiftOneCiracas : startShiftOneSentul);
  const tgl = moment(date, "YYYY-MM-DD HH:mm:SS");
  const jam = moment(tgl.format("HH:mm"), "HH:mm");
  if (jam > moment("00:00", "HH:mm") && jam < moment(startShiftOne, "HH:mm")) {
    return tgl.subtract(1, "days").toDate();
  } else {
    return date.toDate();
  }
};

interface Shift {
  [plantName: string]: {
    [shiftName: string]: string[]
  }
}
export const SHIFT: Shift = {
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


export const getShiftTime = (
  plantName: string,
  shiftList: string[],
): { startTime: Moment; endTime: Moment } => {
	let startTime,
		endTime = null;

	const shiftNow = generateShift(
		moment().format("HH:mm"),
		plantName.toLowerCase()
	);
	if (shiftNow == 3) {
		if (
			moment() >= moment("00:00:00", "HH:mm:ss") &&
			moment() <= moment(shiftList[shiftList.length - 1], "HH:mm:ss")
		) {
			startTime = moment(shiftList[0], "HH:mm:ss").subtract(1, "days");
			endTime = moment(shiftList[shiftList.length - 1], "HH:mm:ss");
		} else {
			startTime = moment(shiftList[0], "HH:mm:ss");
			endTime = moment(shiftList[shiftList.length - 1],"HH:mm:ss").add(1, "days");
		}
	} else {
		startTime = moment(shiftList[0], "HH:mm:ss");
		endTime = moment(shiftList[shiftList.length - 1], "HH:mm:ss");
	}

	return { startTime, endTime };
};

export const getDailyTime = (
  plantName: string,
  shiftList: { [shiftName: string]: string[] }
): { startTime: Moment; endTime: Moment } => {
	let startTime,
		endTime = null;

	const shiftNow = generateShift(
		moment().format("HH:mm"),
		plantName.toLowerCase()
	);
	if (shiftNow == 3) {
		if (
			moment() >= moment("00:00:00", "HH:mm:ss") &&
			moment() <= moment(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss")
		) {
			startTime = moment(shiftList["SHIFT 1"][0], "HH:mm:ss").subtract(1, "days");
			endTime = moment(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss");
		} else {
			startTime = moment(shiftList["SHIFT 1"][0], "HH:mm:ss");
			endTime = moment(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1],"HH:mm:ss").add(1, "days");
		}
	} else {
		startTime = moment(shiftList["SHIFT 1"][0], "HH:mm:ss");
		endTime = moment(shiftList["SHIFT 3"][shiftList["SHIFT 3"].length - 1], "HH:mm:ss").add(1, "days");
	}

	return { startTime, endTime };
};
