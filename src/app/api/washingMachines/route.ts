import { washingMachineType } from "@/types/types";

let washingMachines: washingMachineType[]= [
    { id: 1, lastChange: new Date(), availableWashingMachines: true },
    { id: 2, lastChange: new Date(), availableWashingMachines: true },
    { id: 3, lastChange: new Date(), availableWashingMachines: true },
    { id: 4, lastChange: new Date(), availableWashingMachines: true },
    { id: 5, lastChange: new Date(), availableWashingMachines: true },
    { id: 6, lastChange: new Date(), availableWashingMachines: true }
];

export async function GET() {
    return new Response(JSON.stringify(washingMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, lastChange, availableWashingMachines } = body;

    const putwashingMachines = () => {
        let updatedwashingMachines : washingMachineType[] = []
        washingMachines.map(washingMachine => {
            washingMachine.id === id ?
                updatedwashingMachines.push({ id, lastChange, availableWashingMachines })
                :
                updatedwashingMachines.push(washingMachine)
        })
        return updatedwashingMachines
    }
    washingMachines = putwashingMachines()

    return new Response(JSON.stringify(washingMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}