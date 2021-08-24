import React, { useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "../../shared/style.css";
import { ko } from "date-fns/esm/locale";
import getDay from "date-fns/getDay";

import Checkbox from "@material-ui/core/Checkbox";
import Calendar from "../../assets/images/icons/calendar.svg";

function CreateCalendar({ challengeInfo, setChallengeInfo, id, oldDate }) {
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
      <MobileCont>
        <Label htmlFor="checkweek">인증 기간 중 주말제외 여부</Label>
        <Holiday>
          <p>주말 제외</p>
          <SCheckbox
            id="checkweek"
            type="checkbox"
            placeholder="주말 제외"
            color="error"
            onClick={checkedWeek}
            onChange={findCheck}
          />
        </Holiday>
      </MobileCont>
      <MobileCont>
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
          placeholderText="0000.00.00 ~ 0000.00.00"
          autoComplete="off"
          locale={ko}
          minDate={date}
          isClearable={true}
        />
      </MobileCont>
    </>
  );
}

export default CreateCalendar;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  ${({ theme }) => theme.device.mobileLg} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SubT = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  ${({ theme }) => theme.device.mobileLg} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Holiday = styled.div`
  width: 15vw;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 40px;
  margin-bottom: 2.96vh;
  margin-top: 8px;
  border-radius: 8px;
  position: relative;
  & > p {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.darkGray};
    padding-left: 0.83vw;
    padding-top: 1.1vh;
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    height: 6.875vh;
    margin-top: 16px;
    margin-bottom: 5.18vh;
    padding: 1.48vh 4.44vw 1.48vh 4.44vw;
    & > P {
      font-size: 24px;
      padding-top: 0.41vh;
    }
  }
`;

const SCheckbox = styled(Checkbox)`
  position: absolute;
  right: -8.25vw;
  ${({ theme }) => theme.device.mobileLg} {
    right: -47.35vw;
    .MuiSvgIcon-root {
      width: 8.33vw;
      height: 8.33vw;
    }
  }
`;

const SDatePicker = styled(DatePicker)`
  width: 15vw;
  height: 40px;
  border-radius: 8px;
  margin-bottom: 2.96vh;
  margin-top: 8px;
  padding: 6.5px 0.83vw;
  background-color: ${({ theme }) => theme.colors.lightGray};
  ::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.ms};
    color: ${({ theme }) => theme.colors.darkGray};
  }
  ${({ theme }) => theme.device.mobileLg} {
    width: 91.11vw;
    height: 6.875vh;
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 5.18vh;
    padding: 1.48vh 4.44vw;
    ::placeholder {
      font-size: 24px;
    }
  }
`;

const CalendarContainer = styled.label`
  position: relative;
  & > img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -14.3vw;
    bottom: 1px;
    z-index: 2;
  }
  ${({ theme }) => theme.device.mobileLg} {
    & > img {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -88.3vw;
      bottom: -1px;
      z-index: 2;
    }
  }
`;

const MobileCont = styled.div`
  ${({ theme }) => theme.device.mobileLg} {
    padding: 0 4.44vw 0 4.44vw;
  }
`;
