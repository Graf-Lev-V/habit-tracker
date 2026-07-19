'use client'

import SignOut from "@/components/SignOut"
import { FaExclamationTriangle } from "react-icons/fa"

export default function Error({ reset }: { reset: () => void }) {
    return (
        <main className="flex flex-col items-center justify-center flex-1">
            <div className="p-12 rounded bg-neutral-800 shadow-md flex flex-col gap-4 items-center">   
                <FaExclamationTriangle className="text-5xl text-yellow-500"/>
                <p className="text-2xl">Oops, something went wrong.</p>
                <p className="text-white/75">Please try again, or come back later.</p>
                <div className="flex gap-2">
                    <button className="bg-green-700 hover:brightness-90 rounded py-2 px-4 cursor-pointer transition-colors w-max" onClick={reset}>Try again.</button>
                    <SignOut className=""/>
                </div>
            </div>
        </main>
    )
}