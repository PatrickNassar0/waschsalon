import { DryerMachinesType } from "@/types/types";

let dryerMachines: DryerMachinesType[] = [
    { id: 1, lastChange: new Date(), availableDryerMachines: true },
    { id: 2, lastChange: new Date(), availableDryerMachines: true },
    { id: 3, lastChange: new Date(), availableDryerMachines: true },
    { id: 4, lastChange: new Date(), availableDryerMachines: true },
];

export async function GET() {
    return new Response(JSON.stringify(dryerMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, lastChange, availableDryerMachines } = body;

    const putDryerMachines = () => {
        let updatedDryerMachines : DryerMachinesType[] = []
        dryerMachines.map(dryerMachine => {
            dryerMachine.id === id ?
                updatedDryerMachines.push({ id, lastChange, availableDryerMachines })
                :
                updatedDryerMachines.push(dryerMachine)
        })
        return updatedDryerMachines
    }
    dryerMachines = putDryerMachines()

    return new Response(JSON.stringify(dryerMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}