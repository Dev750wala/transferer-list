import "./App.css";
import { useState } from "react";
import { User } from "./interface";
import UserForm from "./components/UserForm";
import { DataTable } from "./components/DataTable";
import FilterBar from "./components/FilterBar";
import TransfererList from "./components/TransfererList";
import { sampleData } from "./lib/constants";

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


      <input type="checkbox" name="dev" id="dev-unique" onClick={(e: any) => {console.log(e.target.name)}} />
    </>
  );
}

export default App;
