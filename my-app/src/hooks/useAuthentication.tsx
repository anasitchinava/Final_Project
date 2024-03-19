import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuthentication = () => {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return;
};

export default useAuthentication;