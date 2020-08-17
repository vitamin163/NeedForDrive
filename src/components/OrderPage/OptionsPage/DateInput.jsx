import React from 'react';
import DatePicker from 'react-datepicker';

const DateInput = (props) => {
  const { selected, minDate, maxDate, minTime, maxTime, onChange, customInput } = props;
  return (
    <DatePicker
      timeFormat="HH:mm"
      dateFormat="dd.MM.yyyy HH:mm"
      timeIntervals={5}
      showTimeSelect
      placeholderText="Введите дату и время"
      selected={selected}
      maxDate={maxDate}
      minDate={minDate}
      minTime={minTime}
      maxTime={maxTime}
      onChange={onChange}
      calendarClassName="options-page__calendar"
      customInput={customInput}
    />
  );
};
export default DateInput;
