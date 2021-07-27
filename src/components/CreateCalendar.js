import React, { useState } from "react";

// consolelog logger
import { consoleLogger } from "../redux/configureStore";

// date range picker
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function CreateCalendar() {
  // date picker state
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="date-range">
            <input
              className={"input" + (focus === START_DATE ? " -focused" : "")}
              {...startDateInputProps}
              placeholder="Start date"
            />
            <span className="date-range_arrow" />
            <input
              className={"input" + (focus === END_DATE ? " -focused" : "")}
              {...endDateInputProps}
              placeholder="End date"
            />
          </div>
        )}
      </DateRangePicker>
    </>
  );
}

export default CreateCalendar;
