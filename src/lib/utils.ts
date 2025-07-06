import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRandomMessage(type: "winner" | "loser", number: number) {
    const winnerMessages = [
        "Luck is when preparation meets opportunity. You nailed it!",
        "You're on fire! 🔥 Keep the streak alive!",
        "A win is a win — savor it! 🎯",
        "Your instincts were spot on. Keep trusting them!",
        "You're one step ahead. Stay sharp!",
        "Boom! You crushed it. Let's see what's next!",
        "Winning feels good — and you earned it!",
        "Your number came through! Believe in the magic ✨",
    ];
    const loserMessages = [
        "Every loss is one step closer to your next win. Keep going!",
        "Even champions miss sometimes — the key is to try again.",
        "Luck didn’t show up this round, but your moment’s coming!",
        "You didn’t win this time, but you played — and that counts.",
        "It’s not about the number, it’s about showing up. Well done.",
        "Hang in there — fortune favors the bold!",
        "A true competitor keeps showing up. That’s you!",
        "You miss 100% of the shots you don’t take. Keep playing!",
    ];

    const messages = type === "winner" ? winnerMessages : loserMessages;
    return messages[number % messages.length];
}
