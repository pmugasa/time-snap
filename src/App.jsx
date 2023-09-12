import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [task, setTask] = useState("");
  const [clientName, setClientName] = useState("");
  const [selected, setSelected] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setOpenModal(undefined);

    console.log("formdata", task, clientName, selected, fromTime, toTime);
  };
  const data = [
    {
      Date: "2023-09-01",
      Hours: 8,
      Task: "Project A - Analysis",
      "Client Name": "Client B",
    },
    {
      Date: "2023-09-02",
      Hours: 7,
      Task: "Project B - Design",
      "Client Name": "Client A",
    },
    {
      Date: "2023-09-03",
      Hours: 6,
      Task: "Project C - Development",
      "Client Name": "Client Z",
    },
    {
      Date: "2023-09-04",
      Hours: 8,
      Task: "Project A - Analysis",
      "Client Name": "Client X",
    },
    {
      Date: "2023-09-05",
      Hours: 7,
      Task: "Project B - Design",
      "Client Name": "Client Y",
    },
  ];

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
                  selected={selected}
                  onChange={(date) => setSelected(date)}
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
                  key={item["Client Name"]}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.Date}
                  </Table.Cell>
                  <Table.Cell>{item["Client Name"]}</Table.Cell>
                  <Table.Cell>{item.Task}</Table.Cell>
                  <Table.Cell>{item.Hours}</Table.Cell>
                  <Table.Cell>
                    <a
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      href="/tables"
                    >
                      <Pencil size={14} />
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      href="/tables"
                    >
                      <p>
                        <Trash2 size={14} color="red" />
                      </p>
                    </a>
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
