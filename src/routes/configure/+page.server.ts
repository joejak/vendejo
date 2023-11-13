import { walletAddress } from '$lib/store';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const addr = (await request.formData()).get('walletAddress')?.toString(); 
        if(addr){
            walletAddress.set(addr);
            cookies.set(
                'walletAddress', addr,
                {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365,
                    httpOnly: false, // <-- if you want to read it in the browser
                },
            );
        }
        throw redirect(302, '/');
    },
}