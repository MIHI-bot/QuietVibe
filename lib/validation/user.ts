import * as z from 'zod';
export const UserValidation = z.object(
    {
        profile_photo:z.string().url().min(1),
        name:z.string().min(2).max(30),
        username:z.string().min(4).max(30),
        bio:z.string().min(2).max(1000),
    }
)