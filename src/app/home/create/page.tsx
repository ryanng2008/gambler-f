
export default function Page() {
    return (
        <div className="CONTAINER flex flex-col gap-8">
            <div className="HEAD">
                <h1 className="text-5xl font-semibold">Create a bet</h1>
            </div>
            <div className="FORM CONTENT grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Category details</h2>
                    <div className="CATEGORY DETAILS FORMS">Category, subcategory/game</div>
                    <h2 className="text-xl font-semibold">Customise</h2>
                    <div className="">Title, Description, Type of bet</div>
                </div>
                <div className="BET TYPE SPECIFIC CONTENT">Form Content 2, for the specific part</div>
            </div>
        </div>
    )
}