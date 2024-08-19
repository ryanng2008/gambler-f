'use server';
import { FormEvent } from "react"
import { OptionFormData } from '@/app/lib/types';
import { postOption } from "@/app/lib/api/setData";
import OptionFormClient from "@/app/ui/create/optionFormClient"
import { redirect } from "next/navigation";

export default async function OptionFormWrapper() {
    // async function handleSubmit(form: any) {
    //     const result = await postOption(form.heading, form.subheading, form.optiontype, '', form.odds, form.minbet, form.maxbet);
    //         console.log('Done posting option');

    // }
    const handleSubmit = async (form: any) => {
        "use server";
        try {
            const optionPost = await postOption(
                form.heading, 
                form.subheading, 
                form.optiontype, 
                form.bettingline, 
                '', 
                form.odds, 
                form.minbet, 
                form.maxbet);
            
            } catch (error) {
            console.error('Error in OptionFormWrapper: ', error);
        }

    }
    return (
        <OptionFormClient onSubmit={(form: any) => {
            "use server";
            console.log(form)
            handleSubmit(form);
        }}/>
    )
}