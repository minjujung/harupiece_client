import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import getDay from "date-fns/getDay";

function CreateCalendar({ challengeInfo, setChallengeInfo }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [checkWeek, setCheckWeek] = useState(false);

  const checkedWeek = () => {
    setCheckWeek(true);
  };

  const isWeekday = (date) => {
    if (checkWeek === true) {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    } else {
      const day = getDay(date);
      return day;
    }
  };

  console.log(challengeInfo);

  const onChange = (update) => {
    setDateRange(update);
    setChallengeInfo({
      ...challengeInfo,
      challengeStartDate: update[0],
      challengeEndDate: update[1],
    });
  };

  return (
    <>
      <input type="checkbox" checkWeek={checkWeek} onClick={checkedWeek} />
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        locale={ko}
        minDate={new Date()}
        isClearable={true}
      />
    </>
  );
}

export default CreateCalendar;
