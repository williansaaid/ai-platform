"use client"
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { BotAvatar } from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            const userMessage: ChatCompletionMessage = {
                role: "user",
                content: values.prompt
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages,
            });

            setMessages((current) => [ ...current, userMessage, response.data ]);

            form.reset();
        } catch (error) {
            //Open Pro Modal
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Code Generation"
                description="Generate code using descriptive text."
                icon={Code}
                iconColor="text-green"
                bgColor="bg-green/10"
            />
            <div className="px-4 lg:px-8 py-4">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem
                                        className="col-span-12 lg:col-span-10"
                                    >
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-4"
                                                disabled={isLoading}
                                                placeholder="How can I make a reusable button in React?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full bg-green/80 hover:bg-green"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-green/10">
                            <Loader/>
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty
                            label="No conversation started."
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn(
                                    "p-8 w-full flex items-start justify-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-green/20" : "bg-green/10"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                            <div className="overflow-auto w-full my-2 bg-green/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className="bg-green/10 rounded-lg p-1" {...props}/>
                                        )
                                    }}
                                    className="text-sm oveflow-hidden leading-7"
                                >
                                    {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodePage;