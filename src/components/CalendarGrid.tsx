export default function CalendarGrid({ result, totalWeeks, visibleLabels, monthNames }: {result: {date: string, completed: boolean}[], totalWeeks: number, visibleLabels: {month: number, column: number}[], monthNames: string[]}) {
    return (
        <>
            <div className="grid grid-rows-1 gap-1 justify-center" style={{gridTemplateColumns: `repeat(${totalWeeks}, clamp(10px, 4vw, 16px))`}}>
                {visibleLabels.map((ml) => 
                    <div key={ml.column} className="w-full text-white/70 text-sm" style={{gridColumnStart: ml.column + 1}}>{monthNames[ml.month]}</div>
                )}
            </div>
            <div className='grid grid-rows-7 gap-1 justify-center grid-flow-col' style={{gridTemplateColumns: `repeat(${totalWeeks}, clamp(10px, 4vw, 16px))`}}>
                {result.map((day, index) => (
                    <div key={index} className={`rounded-xs ${day.completed ? 'bg-green-600' : 'bg-gray-700'}`} style={{width: 'clamp(10px, 4vw, 16px)', height: 'clamp(10px, 4vw, 16px)'}} />
                ))}
            </div>
        </>
    )
}