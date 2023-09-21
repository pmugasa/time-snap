import { useState } from "react";
import { Plus } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import MyTable from "./components/Table";
import Form from "./components/Form";
import { Button } from "flowbite-react";

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

  //delete task
  const deleteTask = (id) => {
    const updatedData = data.filter((task) => task.id !== id);
    setData(updatedData);
  };

  //edit task
  const editTask = (id) => {
    props.setOpenModal("default");
    const t = data.find((task) => task.id === id);
    if (t) {
      //setSelectedDate(t.date);
      setClientName(t.client);
      // setFromTime(t.fromTime);
      //setToTime(t.toTime);

      return console.log("task found:", task);
    } else {
      return console.log("task not found");
    }
  };

  return (
    <>
      <nav className="p-8 border-b border-gray-300 "></nav>
      <main className="max-w-screen-xl mx-auto p-4">
        <Button onClick={() => props.setOpenModal("default")}>
          Add task
          <Plus size={16} className="my-auto ml-2 " />
        </Button>
        <Form
          Task={Task}
          setData={setData}
          modalProps={props}
          setOpenModal={setOpenModal}
          task={task}
          clientName={clientName}
          fromTime={fromTime}
          toTime={toTime}
          selectedDate={selectedDate}
          setTask={setTask}
          setClientName={setClientName}
          setFromTime={setFromTime}
          setToTime={setToTime}
          setSelectedDate={setSelectedDate}
        />

        {/*table with data*/}
        <div className="my-16">
          <MyTable
            deleteTask={deleteTask}
            data={data}
            editTask={editTask}
            modalProps={props}
            setOpenModal={setOpenModal}
          />
        </div>
      </main>
    </>
  );
}
export default App;
