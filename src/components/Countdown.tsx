"use client";
import { cn } from "@/lib/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type CountdownProps = {
    duration?: number;
    size?: number;
    textClassName?: string;
};

export default function Countdown({ duration, size, textClassName }: CountdownProps) {
    return (
        <CountdownCircleTimer
            isPlaying
            duration={duration || 0}
            colors={["#008000", "#FFFF00", "#FF0000", "#FF0000"]}
            size={size}
            colorsTime={[15, 10, 7, 0]}>
            {({ remainingTime }) =>
                remainingTime > 0 ? (
                    <CountDownText remainingTime={remainingTime} textClassName={textClassName} />
                ) : (
                    <CountDownText remainingTime={0} textClassName={textClassName} />
                )
            }
        </CountdownCircleTimer>
    );
}

const CountDownText = ({ remainingTime, textClassName }: { remainingTime: number; textClassName?: string }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-x-2")}>
            <span
                className={cn(
                    "font-bold transition-all duration-300",
                    remainingTime < 7 && remainingTime != 0 && "text-red-500",
                    textClassName || "!text-6xl",
                )}>
                {remainingTime}
            </span>
            <span className="text-sm text-muted-foreground">seconds</span>
        </div>
    );
};
