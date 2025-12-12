"use client";

import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
    image?: string; // Optional image for things like Cuisines or Providers
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
}

export default function MultiSelect({
    options,
    value,
    onChange,
    placeholder = "Select options...",
    label
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const handleRemove = (e: React.MouseEvent, optionValue: string) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== optionValue));
    };

    return (
        <div className="relative" ref={wrapperRef}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            <div
                className={`min-h-[42px] w-full border rounded-lg bg-white px-3 py-2 cursor-pointer flex flex-wrap gap-2 items-center transition-all ${isOpen ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-300 hover:border-gray-400'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value.length === 0 ? (
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                ) : (
                    value.map(val => {
                        const option = options.find(o => o.value === val);
                        return option ? (
                            <span
                                key={val}
                                className="inline-flex items-center px-2 py-1 rounded bg-primary-50 text-primary-700 text-xs font-medium border border-primary-100"
                            >
                                {option.label}
                                <X
                                    className="w-3 h-3 ml-1 cursor-pointer hover:text-primary-900"
                                    onClick={(e) => handleRemove(e, val)}
                                />
                            </span>
                        ) : null;
                    })
                )}

                <div className="ml-auto flex items-center">
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fade-in">
                    <div className="p-2 sticky top-0 bg-white border-b border-gray-100">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>

                    <div className="p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`flex items-center px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${value.includes(option.value)
                                            ? 'bg-primary-50 text-primary-900'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${value.includes(option.value) ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                                        }`}>
                                        {value.includes(option.value) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    {option.image && (
                                        <img src={option.image} alt="" className="w-6 h-6 rounded-full mr-2 object-cover" />
                                    )}
                                    <span>{option.label}</span>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-sm text-gray-500">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
