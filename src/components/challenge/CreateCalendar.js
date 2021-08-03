import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import getDay from "date-fns/getDay";

function CreateCalendar({ challengeInfo, setChallengeInfo }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [checkweek, setCheckweek] = useState(false);

  const findCheck = (e) => {
    if (e.target.checked) {
      setChallengeInfo({
        ...challengeInfo,
        challengeHoliday: "0,6",
      });
    } else {
      setChallengeInfo({
        ...challengeInfo,
        challengeHoliday: "",
      });
    }
  };

  const leadingZeros = (n, digits) => {
    let zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  };

  const checkedWeek = () => {
    setCheckweek(!checkweek);
  };

  const isWeekday = (date) => {
    if (checkweek === true) {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    } else {
      const day = getDay(date);
      return (
        day === 0 ||
        day === 1 ||
        day === 2 ||
        day === 3 ||
        day === 4 ||
        day === 5 ||
        day === 6
      );
    }
  };

  const changeForm = (date) => {
    if (date) {
      return (
        (date =
          leadingZeros(date.getFullYear(), 4) +
          "-" +
          leadingZeros(date.getMonth() + 1, 2) +
          "-" +
          leadingZeros(date.getDate(), 2)) + "T00:00:00.000"
      );
    }
  };

  const onChange = (update) => {
    setDateRange(update);
    let start = update[0];
    let end = update[1];
    setChallengeInfo({
      ...challengeInfo,
      challengeStartDate: changeForm(start),
      challengeEndDate: changeForm(end),
    });
  };

  let date = new Date();
  date.setDate(date.getDate() + 1);

  return (
    <>
      <label htmlFor="checkweek">주말 체크</label>
      <input
        id="checkweek"
        type="checkbox"
        onClick={checkedWeek}
        onChange={findCheck}
      />
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        locale={ko}
        minDate={date}
        isClearable={true}
      />
    </>
  );
}

export default CreateCalendar;
