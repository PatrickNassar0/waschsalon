import { WashingMachineType } from "@/types/types";
import * as fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'src/data', 'washingMachines.json')

let washingMachines: WashingMachineType[] = JSON.parse(await fs.readFile(filePath, 'utf-8'))

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
        let updatedwashingMachines: WashingMachineType[] = []
        washingMachines.map(washingMachine => {
            washingMachine.id === id ?
                updatedwashingMachines.push({ id, lastChange, availableWashingMachines })
                :
                updatedwashingMachines.push(washingMachine)
        })
        return updatedwashingMachines
    }
    const updatedWashingMachines = putwashingMachines()
    washingMachines = updatedWashingMachines
    await fs.writeFile(filePath, JSON.stringify(updatedWashingMachines, null, 2), 'utf-8');

    return new Response(JSON.stringify(washingMachines), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
