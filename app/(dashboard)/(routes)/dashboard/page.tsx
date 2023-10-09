"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react"
import { useRouter } from "next/navigation"

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet",
        bgColor: "bg-violet/10",
        href: "/conversation"
    },{
        label: "Image Generation",
        icon: Image,
        color: "text-pink",
        bgColor: "bg-pink/10",
        href: "/image"
    },{
        label: "Video Generation",
        icon: Video,
        color: "text-orange",
        bgColor: "bg-orange/10",
        href: "/video"
    },{
        label: "Music Generation",
        icon: Music,
        color: "text-emerald",
        bgColor: "bg-emerald/10",
        href: "/music"
    },{
        label: "Code Generation",
        icon: Code,
        color: "text-green",
        bgColor: "bg-green/10",
        href: "/code"
    },
]

export default function DashboardPage() {
    const router = useRouter();
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI!
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    ChatGPT 3.5 - Valid, quickly and trustfully responses
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                {<tool.icon className={cn("w-8 h-8", tool.color)}/>}
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5h-5"/>
                    </Card>
                ))}
            </div>
        </div>
    )
}
