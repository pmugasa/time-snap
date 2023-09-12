import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [selected, setSelected] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  //form submission
  const handleSubmit = (e) => {
    alert("form submitted");
  };

  return (
    <>
      <nav className="p-8 border-b border-gray-300 "></nav>
      <main className=" p-4 mx-auto">
        <Button onClick={() => props.setOpenModal("default")}>
          Add task
          <Plus size={16} className="my-auto ml-2 " />
        </Button>
        <Modal
          show={props.openModal === "default"}
          onClose={() => props.setOpenModal(undefined)}
        >
          <form onSubmit={handleSubmit}>
            <Modal.Header>Task details</Modal.Header>
            <Modal.Body>
              <fieldset>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                  placeholder="Enter task name"
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                  placeholder="Enter client name"
                />

                <DatePicker
                  className="border border-gray-300 rounded-sm my-2 h-8 p-4 w-full placeholder:text-sm"
                  placeholderText="Date"
                  selected={selected}
                  onChange={(date) => setSelected(date)}
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
                  />
                </div>
              </fieldset>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                onClick={() => props.setOpenModal(undefined)}
              >
                Submit
              </Button>

              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </Modal.Footer>{" "}
          </form>
        </Modal>
      </main>
    </>
  );
}
export default App;
