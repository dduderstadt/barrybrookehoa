interface CardProps {
  heading: string;
  description: string;
  className: string;
  italic?: boolean;
  bio?: string;
}

export function Card({ heading, description, className, italic = false, bio }: CardProps) {
    return (
        <div className={`flex gap-4 rounded-xl shadow-sm p-6 ${className}`}>
            <div className="space-y-2">
                <h3 className="text-[18px] md:text-[22px] font-semibold text-white border-b border-white/40 pb-2 mb-1">{heading}</h3>
                <p className={`leading-8 ${italic ? 'font-bold italic' : 'font-normal'} text-white text-[14px] md:text-[16px]`}>{description}</p>
                {bio && <p className="text-white text-[14px] md:text-[16px] leading-6">{bio}</p>}
            </div>
        </div>
    )
}
