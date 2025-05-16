const LanguageSelect = ({languageIs, changeLanguage}:{languageIs: string, changeLanguage: Function}) => {

  return (
    <div className='flex space-x-4 justify-center items-center'>
        <button className={`${languageIs === 'EN' ? 'bg-blue-400 text-white': ''} border px-4 py-2 rounded-lg cursor-pointer`} onClick={() => changeLanguage('EN')}>
            EN
        </button>
        <button className={`${languageIs === 'DE' ? 'bg-blue-400 text-white': ''} border px-4 py-2 rounded-lg cursor-pointer`} onClick={() => changeLanguage('DE')}>
            DE
        </button>
    </div>
  )
}

export default LanguageSelect
