import "./App.css";
import { useState } from "react";
import { User } from "./interface";
import UserForm from "./components/UserForm";
import { DataTable } from "./components/DataTable";
import FilterBar from "./components/FilterBar";
import TransfererList from "./components/TransfererList";

let sampleData: User[] = [
  {
    id: "1",
    username: "dev",
    fullName: "dev sadisatsowala",
    city: "surat",
    age: 20,
    side: "left",
  },
  {
    id: "2",
    username: "dev1",
    fullName: "dev sadisatsowala1",
    city: "surat1",
    age: 21,
    side: "left",
  },
  {
    id: "3",
    username: "dev3",
    fullName: "dev sadisatsowala3",
    city: "surat3",
    age: 23,
    side: "left",
  },
  {
    id: "4",
    username: "dev4",
    fullName: "dev sadisatsowala4",
    city: "surat4",
    age: 24,
    side: "left",
  },
];

function App() {
  const [data, setData] = useState<User[]>(sampleData);
  const [dataToDisplay, setDataToDisplay] = useState<User[]>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<User>({
    id: "",
    username: "",
    fullName: "",
    city: "",
    age: 0,
    side: "left",
  });

  return (
    <>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-20 m-24">
          <UserForm
            data={data}
            setData={setData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            form={form}
            setForm={setForm}
          />

          <FilterBar data={data} setDataToDisplay={setDataToDisplay} />

          <DataTable
            dataToDisplay={dataToDisplay}
            setData={setData}
            setForm={setForm}
            setIsEditing={setIsEditing}
          />
        </div>

        <div>
          <TransfererList data={data} setData={setData} />
        </div>
      </div>
    </>
  );
}

export default App;
