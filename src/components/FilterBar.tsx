import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fields, User } from "@/interface";
import { Button } from "./ui/button";

const FilterBar = ({
  data,
  setDataToDisplay,
}: {
  data: User[];
  setDataToDisplay: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const uniqueFieldsArray: Fields[] = ["username", "fullName", "city", "age"];

  // const [uniqueFields, setUniqueFields] = React.useState();
  const [uniqueValues, setUniqueValues] = React.useState<(string | number)[]>([]);
  const [uniqueField, setUniqueField] = React.useState("");
  const [uniqueValue, setUniqueValue] = React.useState("");

  const [error, setError] = React.useState("")

  const handleFilter = () => {
    console.log("Clicked the filter button!");

    if(uniqueField.length === 0 || uniqueValue.length === 0) {
      setError("Please Select the filters first")
    }

    let value: string | number = uniqueField === "age" ? Number(uniqueValue) : uniqueValue
  
    setDataToDisplay([])

    setDataToDisplay((_prev) => {
      return data.filter((user) => user[uniqueField as Fields] === value)
    })
  };

  return (
    <>
      <h2 className="text-3xl">Filter User Info</h2>
      <div className="flex flex-row gap-4 border-2 rounded-xl p-4">
        <SelectDemo
          typeTemp="field"
          values={uniqueFieldsArray}
          value={uniqueField}
          data={data}
          setValue={setUniqueField}
          setAnotherVal={setUniqueValues}
          setError={setError}
          />
        <SelectDemo
          typeTemp="value"
          values={uniqueValues}
          data={data}
          value={uniqueValue}
          setValue={setUniqueValue}
          setError={setError}
        />
        <Button onClick={handleFilter}>Filter</Button>
        <Button onClick={() => setDataToDisplay(data)}>All</Button>
      </div>
      <h3 className="text-red-700">{error}</h3>
    </>
  );
};

export default FilterBar;

export function SelectDemo({
  typeTemp,
  data,
  values,
  value,
  setValue,
  setAnotherVal,
  setError,
}: {
  typeTemp: "field" | "value";
  data: User[];
  values: (string | number)[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setAnotherVal?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {

  const handleChange = (value: string) => {
    setValue(value)
    console.log(value);
    
    if (setAnotherVal) {
      setAnotherVal([]);
      let temp = data.map((user) => {
        return user[value as "username" | "fullName" | "city" | "age"]
      })

      setAnotherVal([...new Set(temp)])
    }

    setError("")
  }

  return (
      <Select
        onValueChange={(value) => handleChange(value)}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder={`unique ${typeTemp}`} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            {values.map((value) => {
              return (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
  );
}
