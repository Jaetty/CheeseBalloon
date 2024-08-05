'use server'

import { auth, signIn, signOut } from '@/src/auth'


export const signInWithGoogle = async () => {
  await signIn('google', { /* 옵션 */ })
  // ...
}

export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}
export {
  auth as getSession, 
}