import React, { useState } from 'react'

const LanguageSelect = () => {
    const [languageIs, setLanguageIs] = useState<'EN' | 'DE'>('EN')

  return (
    <div className='flex space-x-4 justify-center items-center'>
        <button className={`${languageIs === 'EN' ? 'bg-blue-400 text-white': ''} border px-4 py-2 rounded-lg cursor-pointer`} onClick={() => setLanguageIs('EN')}>
            EN
        </button>
        <button className={`${languageIs === 'DE' ? 'bg-blue-400 text-white': ''} border px-4 py-2 rounded-lg cursor-pointer`} onClick={() => setLanguageIs('DE')}>
            DE
        </button>
    </div>
  )
}

export default LanguageSelect
