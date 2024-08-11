import Navbar from '@/app/ui/home/navbar'


export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <div className="CONTAINER flex flex-col mx-[3%]">
            <Navbar />
            <div className="mx-12 py-6">{children}</div> {/*Standardize a padding here for all items */}
        </div>
    )
}