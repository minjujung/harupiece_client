import React, { useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import getDay from "date-fns/getDay";
import { useSelector } from "react-redux";

function CreateCalendar({ challengeInfo, setChallengeInfo, id }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [checkweek, setCheckweek] = useState(false);

  const challenge_info = useSelector((state) => state.challengeDetail.detail);

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
      <SubT>인증 기간</SubT>
      <SDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        placeholderText="체크인 날짜 선택"
        locale={ko}
        minDate={date}
        isClearable={true}
      />
      

    </>
  );
}

export default CreateCalendar;

const Label = styled.label`
  font-size: ${({theme}) => theme.fontSizes.xs};
  font-weight: 400;
  color : ${({theme}) => theme.colors.darkGray};
`;

const SubT = styled.p`
  font-size: ${({theme}) => theme.fontSizes.xs};
  font-weight: 400;
  color : ${({theme}) => theme.colors.darkGray};
  margin-bottom : 8px;
`;


const Holiday = styled.div`
  width: 15.00vw;
  display: flex;
  background-color : ${({theme}) => theme.colors.lightGray};
  height: 3.70vh;
  margin-bottom: 2.96vh;
  margin-top : 8px;
  border-radius: 8px;
  & > p {
  width: 3.70vw;
  font-size: ${({theme}) => theme.fontSizes.sm};
  font-weight: 400;
  color : ${({theme}) => theme.colors.darkGray};
  margin-left: 0.83vw;
  padding-top: 1.01vh;
  }
  & > input {
    margin-top: 1.01vh;
    margin-left: 8.49vw;
  }
  
`;

const SDatePicker = styled(DatePicker)`
  width: 15.00vw;
  height: 3.70vh;
  border-radius: 8px;
  margin-bottom: 2.96vh;
  padding-left: 0.83vw;
  padding-top: 1.01vh;
  background-color : ${({theme}) => theme.colors.lightGray};
  ::placeholder {
    font-size: ${({theme}) => theme.fontSizes.ms};
    color : ${({theme}) => theme.colors.darkGray};
  }
`;