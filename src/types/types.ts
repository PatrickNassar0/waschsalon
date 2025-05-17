export type WashingMachineType = {id: number, lastChange: Date, availableWashingMachines: boolean }

export type DryerMachinesType = {id: number, lastChange: Date, availableDryerMachines: boolean }

export type textsType = {
    EN: {
      title: string,
      washingMachines: string,
      dryerMachines: string,
      loading: string,
      yes: string,
      no: string,
      Card:{
        titleWashingMachines: string,
        titleDryerMachines: string,
        textBeforeTime: string,
        available: string,
      }
    },
    DE: {
      title: string,
      washingMachines: string,
      dryerMachines: string,
      loading: string,
      yes: string,
      no: string,
      Card:{
        titleWashingMachines: string,
        titleDryerMachines: string,
        textBeforeTime: string,
        available: string,
      }
    }
  }