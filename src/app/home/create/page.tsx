import OptionFormClient from "@/app/ui/create/optionFormClient"

export default async function Page() {

    return (
        <div className="CONTAINER flex flex-col gap-8">
            <div className="HEAD">
                <h1 className="text-5xl font-semibold">Create an option</h1>
            </div>
            <OptionFormClient />
        </div>

    )
}