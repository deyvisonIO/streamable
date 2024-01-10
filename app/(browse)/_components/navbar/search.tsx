"use client"

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function Search() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                term: value,
            }
        }, { skipEmptyString: true})

        router.push(url);
    }
    const onClear = () => {
        setValue("");
    }
    return (
        <form
            onSubmit={onSubmit}
            className="relative w-full lg:w-[400px] flex items-center"
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="search"
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    className="absolute right-14 text-muted-foreground cursor-pointer hover:opacity-75 transition h-5 w-5 "
                    onClick={onClear}
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="rounded-l-none"
            >
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}
