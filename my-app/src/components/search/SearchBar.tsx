import React from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = ({ value, onChange, onSearch }) => {
    const router = useRouter();

    const handleClear = () => {
        onChange({ target: { value: '' } });
        onSearch('');
        router.replace('/home');
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Search products"
                    value={value}
                    onChange={onChange} />
            </div>
            <div className="ml-4">
                <button
                    className="bg-cyan-800 hover:bg-cyan-900 text-white px-4 py-2 rounded mr-2"
                    onClick={() => onSearch(value)}
                    disabled={value.trim() === ''}>
                    Search
                </button>
                <button
                    className="bg-neutral-400 hover:bg-neutral-500 text-white px-4 py-2 rounded"
                    onClick={handleClear}
                    disabled={value.trim() === ''}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default SearchBar;