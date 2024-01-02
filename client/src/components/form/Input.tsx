import React from "react";
import { ChangeEvent } from "react";

interface InputPros {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    required?: boolean;
    value?: string;
    onChange: (name: string, value: string) => void;
}
const Input: React.FC<InputPros> = ({ type, name, id, placeholder, required = false, value = '', onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
    };
    return (
        <>
            <div className="flex flex-col pt-4">
                <label htmlFor={id}>{placeholder}</label>
                <input type={type} name={name} id={id} placeholder={placeholder} required={required} value={value} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
            </div>

        </>
    )

};
export default Input;