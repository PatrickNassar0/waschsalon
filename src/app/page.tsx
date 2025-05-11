"use client"
import { DryerMachinesType, WashingMachineType } from "@/types/types";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import ShowText from "./components/ShowText";
import LanguageSelect from "./components/LanguageSelect";

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

  const handleClickWashingMachine = async (id: number, availableWashingMachines: boolean, lastChange: string) => {
    await fetch(`http://localhost:3000/api/washingMachines`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, availableWashingMachines, lastChange }),
      })
      .then(res => res.json())
      .then(res => location.reload())
      .catch(err => console.log(err))
  }

  const handleClickDryerMachines = async (id: number, availableDryerMachines: boolean, lastChange: string) => {
    await fetch(`http://localhost:3000/api/dryerMachines`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, availableDryerMachines, lastChange }),
      })
      .then(res => res.json())
      .then(res => location.reload())
      .catch(err => console.log(err))
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



  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 space-y-10 p-5">
      <div className="md:flex items-center justify-evenly w-full gap-x-8 space-y-5 md:space-y-0">
      <h1 className="text-3xl font-bold text-gray-800 text-left">
        Laundry Room Status
        <br />
        Otto-Franke-Straße 45
      </h1>
      <LanguageSelect />
      </div>
      <hr className="w-9/12 border-gray-300" />
      <h2 className="text-2xl font-bold text-gray-800">
        Washing Machines
      </h2>
      <div className="grid md:grid-cols-3 items-center justify-center gap-5">
        {washingMachines?.map((washingMachine) => (
          <div key={washingMachine.id}>
            <Button isActive={washingMachine.availableWashingMachines} onClick={() => handleClickWashingMachine(washingMachine.id, !washingMachine.availableWashingMachines, new Date().toString())}>
              <ShowText text='Washing Machine' id={washingMachine.id} lastChange={changeDateFormat(washingMachine.lastChange.toString())} available={washingMachine.availableWashingMachines} />
            </Button>
          </div>
        ))}
      </div>
      <hr className="w-9/12 border-gray-300" />
      <h2 className="text-2xl font-bold text-gray-800">
        Dryer Machines
      </h2>
      <div className="grid md:grid-cols-4 items-center justify-center gap-5">
        {dryerMachines?.map((dryerMachine) => (
          <div key={dryerMachine.id}>
            <Button isActive={dryerMachine.availableDryerMachines} onClick={() => handleClickDryerMachines(dryerMachine.id, !dryerMachine.availableDryerMachines, new Date().toString())}>
              <ShowText text='Dryer Machine' id={dryerMachine.id} lastChange={changeDateFormat(dryerMachine.lastChange.toString())} available={dryerMachine.availableDryerMachines} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
