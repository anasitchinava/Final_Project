'use client'
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const LoadMoreButton = ({ onClick, isLoading }) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search')

    if (search) {
        return null;
    }

    return (
        <div className="text-center mt-4 mb-10">
            <button
                className="bg-cyan-800 hover:bg-cyan-900 text-white px-4 py-2 rounded"
                onClick={onClick}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Load More'}
            </button>
        </div>
    );
};

const LoadMoreButtonWithSuspense = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoadMoreButton {...props} />
    </Suspense>
);

export default LoadMoreButtonWithSuspense;
