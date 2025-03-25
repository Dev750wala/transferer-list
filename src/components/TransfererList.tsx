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
  return (
    <div className="flex flex-row justify-center gap-7">
      <Block data={data} side="left" key="left" />

      <div className="flex flex-col gap-5">
        <TransferButton
          from="left"
          to="right"
          data={data}
          setData={setData}
          mode="selected"
          symbol=">"
          key={1}
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
        />{" "}
        {/* << */}
      </div>

      <Block data={data} side="right" key="right" />
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
}: {
  from: "left" | "right";
  to: "left" | "right";
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  mode: "selected" | "all";
  symbol: string;
}) => {

  function handleTransfer() {
    
    if (mode === "all") {
      console.log(to);
      
      console.log("hello Woeldsfsd");
      console.log(data);
      setData((prev) => {
        return prev.map((user) => {
          return { ...user, side: to };
        });
      });
      console.log(data);
      
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

  return <Button onClick={handleTransfer}>{symbol}</Button>;
};

export default TransfererList;

const Block = ({ data, side }: { data: User[]; side: "left" | "right" }) => {
  return (
    <div className="m-4 flex-col justify-start items-start min-w-20 min-h-52 border-2 rounded-2xl border-dashed">
      {data.map((user) => {
        return (
          user.side === side && (
            <div className="p-3" key={user.id}>
              <span>
                <input
                  type="checkbox"
                  name={user.username}
                  id={`${user.id}-transfer`}
                  
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
