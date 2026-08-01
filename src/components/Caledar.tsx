import { buildCalendar } from "@/lib/buildCalendar"
import CalendarGrid from "./CalendarGrid"

export default function Calendar({ calendar }: { calendar: string[] }) {

    const desktop = buildCalendar(365, calendar)
    const mobile = buildCalendar(90, calendar)

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div className="border-t border-white/10 pt-3 mt-1 min-w-0">
            <div className="hidden sm:block">
                <CalendarGrid {...desktop} monthNames={monthNames} />
            </div>
            <div className="block sm:hidden">
                <CalendarGrid {...mobile} monthNames={monthNames} />
            </div>
        </div>
    )
}