import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [clientName, setClientName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  //task constructor
  function Task(date, client, task, hours) {
    this.date = date;
    this.client = client;
    this.task = task;
    this.hours = hours;
    this.id = data.length + 1;
  }

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

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setOpenModal(undefined);
    const ms = toTime - fromTime;

    const hrs = convertMsToTime(ms);
    const date = formatDate(selectedDate);
    //format date

    const t = new Task(date, clientName, task, hrs);

    setData((prevData) => [...prevData, t]);
    console.log(t);
  };

  //delete task
  const deleteTask = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);
  };

  return (
    <>
      <nav className="p-8 border-b border-gray-300 "></nav>
      <main className="max-w-screen-xl mx-auto p-4">
        <Button onClick={() => props.setOpenModal("default")}>
          Add task
          <Plus size={16} className="my-auto ml-2 " />
        </Button>

        <Modal
          show={props.openModal === "default"}
          onClose={() => props.setOpenModal(undefined)}
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
                  form="timeSheetForm"
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                  placeholder="Enter client name"
                  onChange={(e) => setClientName(e.target.value)}
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
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </Modal.Footer>{" "}
          </form>
        </Modal>

        {/*table with data*/}
        <div className="my-16">
          <Table hoverable className="w-full">
            <Table.Head>
              <Table.HeadCell className="w-10">Date</Table.HeadCell>
              <Table.HeadCell className="w-40">Client</Table.HeadCell>
              <Table.HeadCell className="w-60">Task</Table.HeadCell>
              <Table.HeadCell className="w-20">Hours</Table.HeadCell>
              <Table.HeadCell className="w-10">
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell className="w-10">
                <span className="sr-only">
                  delete
                  <Trash2 size={14} />
                </span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                <Table.Row
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.date}
                  </Table.Cell>
                  <Table.Cell>{item.client}</Table.Cell>
                  <Table.Cell>{item.task}</Table.Cell>
                  <Table.Cell>{item.hours}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      <Pencil size={14} />
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <button type="button" onClick={() => deleteTask(item.id)}>
                      <Trash2 size={14} color="red" />{" "}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </main>
    </>
  );
}
export default App;
