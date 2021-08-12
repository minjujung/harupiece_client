import React, { useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "../../shared/style.css";
import { ko } from "date-fns/esm/locale";
import getDay from "date-fns/getDay";

import Calendar from "../../assets/images/icons/calendar.svg";

function CreateCalendar({ challengeInfo, setChallengeInfo, id, oldDate }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [checkweek, setCheckweek] = useState(false);

  const findCheck = (e) => {
    if (e.target.checked) {
      console.log("checked");
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
      <div>
        <Label htmlFor="checkweek">인증 기간 중 주말제외 여부</Label>
        <Holiday>
          <p>주말 제외</p>
          <input
            id="checkweek"
            type="checkbox"
            placeholder="주말 제외"
            onClick={checkedWeek}
            onChange={findCheck}
          />
        </Holiday>
      </div>
      <CalendarContainer htmlFor="calendar">
        <SubT>인증 기간</SubT>
        <img src={Calendar} alt="calendar" />
      </CalendarContainer>
      <SDatePicker
        id="calendar"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        placeholderText={oldDate ? oldDate : "0000.00.00 ~ 0000.00.00"}
        locale={ko}
        minDate={date}
        isClearable={true}
      />
    </>
  );
}

export default CreateCalendar;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const SubT = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 8px;
`;

const Holiday = styled.div`
  width: 15vw;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 3.7vh;
  margin-bottom: 2.96vh;
  margin-top: 8px;
  border-radius: 8px;
  & > p {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.darkGray};
    padding-left: 0.83vw;
    padding-top: 1.01vh;
  }
  & > input {
    cursor: pointer;
    border: 1px solid #222222;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    margin-top: 0.78vh;
    margin-left: 8.11vw;
  }
`;

const SDatePicker = styled(DatePicker)`
  width: 15vw;
  height: 3.7vh;
  border-radius: 8px;
  margin-bottom: 2.96vh;
  padding-left: 0.83vw;
  padding-top: 1.01vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  ::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const CalendarContainer = styled.label`
  position: relative;
  & > img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -14.3vw;
    bottom: 5px;
    z-index: 10;
  }
`;
