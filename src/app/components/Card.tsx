import { textsType } from '@/types/types'
import React from 'react'

const Card = ({ languageIs, title, texts, id, lastChange, available }: { languageIs: 'EN' | 'DE', title: { EN: string, DE: string }, texts: textsType, id: number, lastChange: string, available: boolean }) => {
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

    return (
        <div className="p-4 text-white space-y-2">
            <h3 className="text-xl font-bold underline">
                {languageIs === 'EN' ? title.EN : title.DE} {id}
            </h3>
            <p>
                {texts[languageIs].Card.textBeforeTime}  <span className="font-medium">{changeDateFormat(lastChange)}</span>
            </p>
            <p>
                {texts[languageIs].Card.available}:{' '}
                <span className='font-semibold'>
                    {available ? texts[languageIs].yes : texts[languageIs].no}
                </span>
            </p>
        </div>

    )
}

export default Card
