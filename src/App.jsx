import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [date, setDate] = useState("");
  const [client, setClient] = useState("");
  const [engagement, setEngagement] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);
  const [tasks, setTasks] = useState([]);

  class Task {
    constructor(client, engagement, hoursWorked, date, id) {
      this.client = client;
      this.engagement = engagement;
      this.hoursWorked = hoursWorked;
      this.date = date;
      this.id = id;
    }
  }

  const handleForm = (e) => {
    e.preventDefault();
    const id = tasks.length;
    const task = new Task(client, engagement, hoursWorked, date, id);
    setTasks([...tasks, task]);
  };

  //sort results by date
  const sortedTasks = [...tasks].sort(
    (objA, objB) => Number(objA.date) - Number(objB.date)
  );

  //store grouped clients
  //TODO to be rendered as summary

  const groupedClients = [];

  for (const task of tasks) {
    const client = task.client;

    const existingClient = groupedClients.find(
      (group) => group.client === client
    );

    //if client exist
    if (existingClient) {
      existingClient.totalHoursWorked =
        Number(existingClient.totalHoursWorked) + Number(task.hoursWorked);
    } else {
      //client does not exist
      [
        ...groupedClients,
        {
          client: client,
          engagement: task.engagement,
          totalHoursWorked: task.hoursWorked,
        },
      ];
    }
  }

  //check if date is in the current month
  const isDateInCurrentMonth = (date) => {
    const currentDate = new Date();

    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  console.log("grouped totals:", groupedClients);
  return (
    <>
      <div className="w-full flex justify-center p-8">
        <div className="w-80 h-80 border border-black p-2">
          <form onSubmit={handleForm}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="border border-red-500 h-10"
              />
              <input
                type="text"
                placeholder="task"
                value={engagement}
                onChange={(e) => setEngagement(e.target.value)}
                className="border border-red-500 h-10"
              />
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="border border-red-500 h-10"
                name="date"
                placeholderText="date"
                filterDate={isDateInCurrentMonth}
              />
              <input
                type="number"
                placeholder="hours"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="border border-red-500 w-20 h-10 "
              />

              <button
                type="submit"
                className="px-1.5 py-0.5 bg-green-400 text-white"
              >
                add
              </button>
            </div>
          </form>

          {sortedTasks.length > 0 &&
            sortedTasks.map((task) => (
              <div className="mt-16 flex justify-between" key={task.id}>
                <p>{task.client}</p>
                <p>{task.engagement}</p>
                <p>{task.hoursWorked}</p>
                <p>{task.date.toLocaleDateString()}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
