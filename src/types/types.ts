export type WashingMachineType = {id: number, lastChange: string, availableWashingMachines: boolean }

export type DryerMachinesType = {id: number, lastChange: string, availableDryerMachines: boolean }

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