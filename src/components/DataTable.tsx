import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/interface";
import { Button } from "./ui/button";


export function DataTable({
  dataToDisplay,
  setData,
  setIsEditing,
  setForm,
}: {
  dataToDisplay: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  setForm: React.Dispatch<React.SetStateAction<User>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  function handleDeleteUser(index: number) {
    setData(prev => {
      prev.splice(index, 1);
      return prev; 
    })
  }

  return (
    <Table className=" py-0" >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataToDisplay.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsEditing(true);
                  setForm(dataToDisplay[index]);
                }}
              >
                Edit
              </Button>{" "}
            </TableCell>
            <TableCell>
              <Button variant={"link"} onClick={() => handleDeleteUser(index)}>
                Delete
              </Button>{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
