import Header from "@/components/Header";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            {children}
        </div>
    )
}