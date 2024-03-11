import React, { useState } from 'react';
import {auth,googleProvider} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    // Sign in with email and password
    const signIn = async()=>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.error(error);
            }}
    // Sign in with google
    const signInWithGoogle = async()=>{
        try {
            await signInWithPopup(auth,googleProvider)
        } catch (error) {
            console.error(error);
            }}
    // Log out
    const logOut = async()=>{
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error);
            }}
  return (
    <div>
      <input type="text" placeholder='Email....' 
      onChange={(e)=>setEmail(e.target.value)} />
      <input type="password"  placeholder='Password...' 
      onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign in</button><br/> <br/>
      <button onClick={signInWithGoogle}>Sign in with google</button><br/><br/>
      <button onClick={logOut}>SignOut</button>
    </div>
  )
}

export default Auth
