import Navbar from '@/app/ui/home/navbar'
import { RouteChangeListener } from './routeChangeListener'


export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <main className="CONTAINER flex flex-col mx-[3%]">
            {/* <RouteChangeListener /> */}
            <Navbar />
            <div className="mx-12 py-6">{children}</div> {/*Standardize a padding here for all items */}
        </main>
    )
}