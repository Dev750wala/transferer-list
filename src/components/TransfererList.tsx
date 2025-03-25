import { User } from "@/interface";
import React, { useState } from "react";
import { Button } from "./ui/button";

const TransfererList = ({
  data,
  setData,
}: {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  function handleTransfer(
    mode: "selected" | "all",
    from: "left" | "right",
    to: "left" | "right"
  ) {
    if (mode === "all") {
      setData((prev) => {
        return prev.map((user) => {
          return { ...user, side: to };
        });
      });
    } else {
      setData((prev) => {
        return prev.map((user) => {
          let ele = document.getElementById(
            `${user.id}-transfer`
          ) as HTMLInputElement;
          return user.side === from && ele.checked
            ? { ...user, side: to }
            : user;
        });
      });
    }
  }

  return (
    <div className="flex flex-row justify-center gap-7">
      <Block data={data} side="left" key="left" onSelect={setSelected} />

      <div className="flex flex-col gap-5">
        <TransferButton
          from="left"
          to="right"
          data={data}
          setData={setData}
          mode="selected"
          symbol=">"
          key={1}
          handleTransfer={handleTransfer}
        />{" "}
        {/* > */}
        <TransferButton
          from="left"
          to="right"
          data={data}
          setData={setData}
          mode="all"
          symbol=">>"
          key={2}
          handleTransfer={handleTransfer}
        />{" "}
        {/* >> */}
        <TransferButton
          from="right"
          to="left"
          data={data}
          setData={setData}
          mode="selected"
          symbol="<"
          key={3}
          handleTransfer={handleTransfer}
        />{" "}
        {/* < */}
        <TransferButton
          from="right"
          to="left"
          data={data}
          setData={setData}
          mode="all"
          symbol="<<"
          key={4}
          handleTransfer={handleTransfer}
        />{" "}
        {/* << */}
      </div>

      <Block data={data} side="right" key="right" onSelect={setSelected} />
    </div>
  );
};

const TransferButton = ({
  from,
  to,
  data,
  setData,
  mode,
  symbol,
  handleTransfer,
}: {
  from: "left" | "right";
  to: "left" | "right";
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  mode: "selected" | "all";
  symbol: string;
  handleTransfer: (
    mode: "selected" | "all",
    from: "left" | "right",
    to: "left" | "right"
  ) => void;
}) => {
  return (
    <Button onClick={() => handleTransfer(mode, from, to)}>{symbol}</Button>
  );
};

export default TransfererList;

const Block = ({
  data,
  side,
  onSelect,
}: {
  data: User[];
  side: "left" | "right";
  onSelect: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className="m-4 flex-col justify-start items-start min-w-20 min-h-52 border-2 rounded-2xl border-dashed">
      {data.map((user) => {
        return (
          user.side === side && (
            <div className="p-3" key={user.id}>
              <span>
                <input
                  type="checkbox"
                  name={user.id}
                  id={`${user.id}-transfer`}
                  onClick={(e: any) =>
                    onSelect((prev) => {
                      if (e.target.checked) {
                        return [...prev, user.id];
                      } else {
                        return prev.filter((id) => id !== user.id);
                      }
                    })
                  }
                />{" "}
                {user.username}
              </span>{" "}
              <br />
            </div>
          )
        );
      })}
    </div>
  );
};
