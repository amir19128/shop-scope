/**
 * Reusable SearchInput component
 * 
 * Renders a styled input element with placeholder and value control.
 * Calls onChange callback when the value changes.
 */
'use client';

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({ value = '', onChange, placeholder = 'ُSearch...' }: Props) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}// Call the onChange handler if it exists, passing the new value
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 
                 text-sm text-white placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
    );
};

export default SearchInput;
