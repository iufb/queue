
'use client'
import { adminLogout } from '@/shared/api';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export const Logout = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await adminLogout()
            router.push('/admin/login')
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Button className='absolute right-4 top-10' onClick={handleLogout}>Выйти</Button>
    );
};
