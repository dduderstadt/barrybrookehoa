export function Card({ heading, description, className, italic }: { heading: string, description: string, className: string, italic: string }) {
    return (
        <div className={`flex gap-4 rounded-xl shadow-sm p-6 ${className}`}>
            <div className="space-y-2">
                <h3 className="text-[22px] font-semibold text-white">{heading}</h3>
                <p className={`leading-8 ${italic} text-white`}>{description}</p>
            </div>
        </div>
    )
}