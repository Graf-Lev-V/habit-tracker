import Header from "@/components/Header";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
        {children}
        </>
    )
}