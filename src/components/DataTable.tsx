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
    filter,
    data,
    setData,
    setIsEditing,
    setForm,
}: {
    filter: [string, string];
    data: User[];
    setData: React.Dispatch<React.SetStateAction<User[]>>;
    setForm: React.Dispatch<React.SetStateAction<User>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    function handleDeleteUser(index: number) {
        setData((prev) => {
            prev.splice(index, 1);
            return prev;
        });
    }

    return (
        <Table className="py-0">
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
                {data.map((user, index) => {
                    if (
                        filter[0] === "all" ||
                        user[
                            filter[0] as
                                | "username"
                                | "fullName"
                                | "city"
                                | "age"
                        ] === filter[1]
                    ) {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>{user.city}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>
                                    <Button
                                        variant={"secondary"}
                                        onClick={() => {
                                            setIsEditing(true);
                                            setForm(data[index]);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={"link"}
                                        onClick={() => handleDeleteUser(index)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    }
                })}
            </TableBody>
        </Table>
    );
}
