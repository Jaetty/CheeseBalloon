interface DetailSelectDateProps {
  handleDate: (
    selectedDate: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function DetailSelectDate({
  handleDate,
}: DetailSelectDateProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = parseInt(event?.target.value, 30);
    handleDate(selectedDate, event);
  };

  return (
    <div>
      <select id="selectDate" onChange={handleChange}>
        <option value={30}>30일</option>
        <option value={14}>14일</option>
        <option value={7}>7일</option>
      </select>
    </div>
  );
}
