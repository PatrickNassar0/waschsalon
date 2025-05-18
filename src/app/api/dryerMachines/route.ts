import { DryerMachinesType } from "@/types/types";
import * as fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'src/data', 'dryerMachines.json')

let dryerMachines: DryerMachinesType[] = JSON.parse(await fs.readFile(filePath, 'utf-8'))

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
    const updatedDryerMachines = putDryerMachines()
    dryerMachines = updatedDryerMachines
    await fs.writeFile(filePath, JSON.stringify(updatedDryerMachines, null, 2), 'utf-8');

    return new Response(JSON.stringify(dryerMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
