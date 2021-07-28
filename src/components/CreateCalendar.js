import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

function CreateCalendar({ challengeInfo, setChallengeInfo }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // console.log(dateRange);

  const saveStartDate = (start) => {
    setChallengeInfo({ ...challengeInfo, challengeStartDate: start });
    console.log(challengeInfo);
  };

  const saveEndDate = (end) => {
    setChallengeInfo({ ...challengeInfo, challengeEndDate: end });
    console.log(challengeInfo);
  };

  return (
    <>
      <DatePicker
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
      />
    </>
  );
}

export default CreateCalendar;
