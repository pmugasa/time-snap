import { Pencil, Trash2 } from "lucide-react";
import { Table } from "flowbite-react";

const MyTable = ({ deleteTask, data, editTask, setOpenModal, modalProps }) => {
  return (
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
              <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                <Pencil size={14} onClick={() => editTask(item.id)} />
              </button>
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
  );
};

export default MyTable;
