"use client"
import { dryerMachinesType, washingMachineType } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [washingMachines, setWashingMachines] = useState<washingMachineType[] | undefined>()
  const [dryerMachines, setDryerMachines] = useState<dryerMachinesType[] | undefined>()

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
    <div>
      {washingMachines?.map((washingMachine) => (
        <>
          <button>
            washing Machines {washingMachine.id}
          </button>
          <br />
        </>
      ))}
      <br />
      <br />
      {dryerMachines?.map((dryerMachine) => (
        <>
          <button>
            dryer Machines {dryerMachine.id}
          </button>
          <br />
        </>
      ))}
    </div>
  );
}
