import { Modal, Button } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState } from "react";

const Form = ({
  Task,
  setData,
  modalProps,
  setOpenModal,
  setClientName,
  setTask,
  setSelectedDate,
  setFromTime,
  setToTime,
  task,
  clientName,
  selectedDate,
  fromTime,
  toTime,
}) => {
  //convert miliseconds to hours
  const convertMsToTime = (milliseconds) => {
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = (minutes / 60).toFixed(2);

    seconds = seconds % 60;
    minutes = minutes % 60;
    console.log("hours", hours);
    return hours;
  };

  //format date
  const formatDate = (d) => {
    const currentDate = new Date(d);
    currentDate.setDate(currentDate.getDate());
    const formattedDate = currentDate.toDateString();
    return formattedDate;
  };

  //add task
  const handleSubmit = (e) => {
    e.preventDefault();
    modalProps.setOpenModal(undefined);
    const ms = toTime - fromTime;

    const hrs = convertMsToTime(ms);
    const date = formatDate(selectedDate);
    //format date

    const t = new Task(date, clientName, task, hrs);

    setData((prevData) => [...prevData, t]);
    setClientName("");
    setFromTime("");
    setToTime("");
    setSelectedDate("");
    setTask("");
    console.log(t);
  };

  return (
    <>
      <Modal
        show={modalProps.openModal === "default"}
        onClose={() => modalProps.setOpenModal(undefined)}
      >
        <Modal.Header>Task details</Modal.Header>
        <form onSubmit={handleSubmit} id="timeSheetForm">
          <Modal.Body>
            <fieldset>
              <input
                type="text"
                className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                placeholder="Enter task name"
                onChange={(e) => setTask(e.target.value)}
                value={task}
                form="timeSheetForm"
              />

              <input
                type="text"
                className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                placeholder="Enter client name"
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
                form="timeSheetForm"
              />

              <DatePicker
                className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                placeholderText="Date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                form="timeSheetForm"
              />
              <div className="flex space-x-2 my-2">
                <DatePicker
                  className="border border-gray-300 rounded-sm  h-8 p-4 w-full placeholder:text-sm"
                  placeholderText="Start"
                  selected={fromTime}
                  onChange={(t) => setFromTime(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  form="timeSheetForm"
                />
                <DatePicker
                  className="border border-gray-300 rounded-sm  h-8 p-4 w-full placeholder:text-sm"
                  placeholderText="Finish"
                  selected={toTime}
                  onChange={(t) => setToTime(t)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  form="timeSheetForm"
                />
              </div>
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="timeSheetForm">
              Submit
            </Button>

            <Button
              color="gray"
              type="button"
              onClick={() => modalProps.setOpenModal(undefined)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Form;
