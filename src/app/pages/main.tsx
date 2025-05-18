"use client"
import { DryerMachinesType, textsType, WashingMachineType } from "@/types/types";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import LanguageSelect from "../components/LanguageSelect";
import { redirect, useSearchParams } from "next/navigation";

export default function Main() {
  const [washingMachines, setWashingMachines] = useState<WashingMachineType[] | undefined>()
  const [dryerMachines, setDryerMachines] = useState<DryerMachinesType[] | undefined>()
  const searchParams = useSearchParams()
  const [languageIs, setLanguageIs] = useState<'EN' | 'DE'>('DE')

  const texts: textsType = {
    EN: {
      title: 'Laundry Room Status',
      washingMachines: 'Washing Machines',
      dryerMachines: 'Dryer Machines',
      loading: 'Loading data...',
      yes: 'Yes',
      no: 'No',
      Card: {
        titleWashingMachines: 'Washing Machine',
        titleDryerMachines: 'Dryer Machine',
        textBeforeTime: 'Last change at',
        available: 'Available',
      }
    },
    DE: {
      title: 'Waschküchenstatus',
      washingMachines: 'Waschmaschinen',
      dryerMachines: 'Trocknungsmaschinen',
      loading: 'Laden daten...',
      yes: 'Ja',
      no: 'Nein',
      Card: {
        titleWashingMachines: 'Waschmaschine',
        titleDryerMachines: 'Trockner Maschine',
        textBeforeTime: 'Letzter Wechsel am',
        available: 'Verfügbar',
      }
    }
  }

  const changeLanguage = (language: 'EN' | 'DE') => {
    setLanguageIs(language)
    redirect(`?language=${language}`)
  }



  const handleClickWashingMachine = async (id: number, availableWashingMachines: boolean, lastChange: string) => {
    await fetch(`/api/washingMachines`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, availableWashingMachines, lastChange }),
      })
      .then(res => res.json())
      .then(res => setWashingMachines(res))
      .catch(err => console.log(err))
  }

  const handleClickDryerMachines = async (id: number, availableDryerMachines: boolean, lastChange: string) => {
    await fetch(`/api/dryerMachines`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, availableDryerMachines, lastChange }),
      })
      .then(res => res.json())
      .then(res => setDryerMachines(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const getlanguage = () => ['EN', 'DE'].includes(searchParams.get('language') ?? '') ? (searchParams.get('language')?.toString() as 'EN' | 'DE') : 'DE'

    const fetchDate = async () => {
      const washingMachinesRes = await fetch('/api/washingMachines')
        .then(res => res.json())
        .catch(err => console.log(err))

      const dryerMachinesRes = await fetch('/api/dryerMachines')
        .then(res => res.json())
        .catch(err => console.log(err))

        console.log(dryerMachinesRes)
      setWashingMachines(washingMachinesRes)
      setDryerMachines(dryerMachinesRes)
    }
    setLanguageIs(getlanguage())
    fetchDate()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 space-y-10 p-5">
      <div className="md:flex items-center justify-evenly w-full gap-x-8 space-y-5 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 text-left">
          {texts[languageIs].title}
        </h1>
        <LanguageSelect languageIs={languageIs} changeLanguage={changeLanguage} />
      </div>

      <hr className="w-9/12 border-gray-300" />

      <h2 className="text-2xl font-bold text-gray-800">
        {texts[languageIs].washingMachines}
      </h2>

      {washingMachines ?
        <div className="grid md:grid-cols-3 items-center justify-center gap-5">
          {washingMachines?.map((washingMachine) => (
            <div key={washingMachine.id}>
              <Button
                isActive={washingMachine.availableWashingMachines}
                onClick={() => handleClickWashingMachine(washingMachine.id, !washingMachine.availableWashingMachines, new Date().toString())}
              >
                <Card
                  languageIs={languageIs}
                  title={{ EN: texts.EN.Card.titleWashingMachines, DE: texts.DE.Card.titleWashingMachines }}
                  texts={texts}
                  id={washingMachine.id}
                  lastChange={washingMachine.lastChange.toString()}
                  available={washingMachine.availableWashingMachines}
                />
              </Button>
            </div>
          ))}
        </div>
        :
        <div className="w-full text-center">
          <p className="text-gray-500">{texts[languageIs].loading}</p>
        </div>
      }

      <hr className="w-9/12 border-gray-300" />

      <h2 className="text-2xl font-bold text-gray-800">
        {texts[languageIs].dryerMachines}
      </h2>

      {dryerMachines ?
        <div className="grid md:grid-cols-4 items-center justify-center gap-5">
          {dryerMachines?.map((dryerMachine) => (
            <div key={dryerMachine.id}>
              <Button
                isActive={dryerMachine.availableDryerMachines}
                onClick={() => handleClickDryerMachines(dryerMachine.id, !dryerMachine.availableDryerMachines, new Date().toString())}
              >
                <Card
                  languageIs={languageIs}
                  title={{ EN: texts.EN.Card.titleDryerMachines, DE: texts.DE.Card.titleDryerMachines }}
                  texts={texts}
                  id={dryerMachine.id}
                  lastChange={dryerMachine.lastChange.toString()}
                  available={dryerMachine.availableDryerMachines}
                />
              </Button>
            </div>
          ))}
        </div>
        :
        <div className="w-full text-center">
          <p className="text-gray-500">{texts[languageIs].loading}</p>
        </div>
      }
    </div>
  );
}
