import React, { useState } from "react";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

function CreateCalendar({ challengeInfo, setChallengeInfo }) {
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;

  const saveStartDate = (start) => {
    setChallengeInfo({ ...challengeInfo, challengeStartDate: start });
    console.log(challengeInfo);
  };

  const saveEndDate = (end) => {
    setChallengeInfo({ ...challengeInfo, challengeEndDate: end });
    console.log(challengeInfo);
  };

  // nice-date

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);

  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  return (
    <>
      {/* <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
      /> */}
      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={ko}
      />
    </>
  );
}

export default CreateCalendar;
