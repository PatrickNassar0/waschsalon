"use client"
import { DryerMachinesType, WashingMachineType } from "@/types/types";
import { useEffect, useState } from "react";
import Button from "./components/Button";

export default function Home() {
  const [washingMachines, setWashingMachines] = useState<WashingMachineType[] | undefined>()
  const [dryerMachines, setDryerMachines] = useState<DryerMachinesType[] | undefined>()

  const changeDateFormat = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return dateObj.toLocaleString('de-DE', options);
  }

  useEffect(() => {
    const fetchDate = async () => {
      const washingMachinesRes = await fetch('http://localhost:3000/api/washingMachines')
        .then(res => res.json())
        .catch(err => console.log(err))

      const dryerMachinesRes = await fetch('http://localhost:3000/api/dryerMachines')
        .then(res => res.json())
        .catch(err => console.log(err))

      setWashingMachines(washingMachinesRes)
      setDryerMachines(dryerMachinesRes)
    }
    fetchDate()
  }, [])

  console.log(washingMachines)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-10 px-5">
      <h2 className="text-2xl font-bold text-gray-800">
        Washing Machines
      </h2>
      <div className="grid md:grid-cols-3 items-center justify-center gap-5">
        {washingMachines?.map((washingMachine) => (
          <div key={washingMachine.id}>
            <Button isActive={washingMachine.availableWashingMachines}>
              <p>Washing Machines {washingMachine.id}</p>
              <p>Last change at {changeDateFormat(washingMachine.lastChange.toString())}</p>
            </Button>
          </div>
        ))}
      </div>
      <hr className="my-6 border-t border-gray-300 w-9/12" />
      <h2 className="text-2xl font-bold text-gray-800">
        Dryer Machines
      </h2>
      <div className="grid md:grid-cols-4 items-center justify-center gap-5">
        {dryerMachines?.map((dryerMachine) => (
          <div key={dryerMachine.id}>
            <Button isActive={dryerMachine.availableDryerMachines}>
              <p>Dryer Machines {dryerMachine.id}</p>
              <p>Last change at {changeDateFormat(dryerMachine.lastChange.toString())}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
