import React from 'react'

const ShowText = ({ text, id, lastChange, available }: { text: string, id: number, lastChange: string, available: boolean }) => {
    return (
        <div className="p-4 text-white space-y-2">
            <h3 className="text-xl font-bold underline">
                {text} {id}
            </h3>
            <p>
                Last change at <span className="font-medium">{lastChange}</span>
            </p>
            <p>
                Available:{" "}
                <span className='font-semibold'>
                    {available ? 'Yes' : 'No'}
                </span>
            </p>
        </div>

    )
}

export default ShowText
