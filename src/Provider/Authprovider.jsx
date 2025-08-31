
import  { createContext, useState } from 'react';
import { useEffect} from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
export const AuthContext= createContext();
const auth = getAuth(app)
const Authprovider = ({children}) => {
   const [user,setuser]=useState(null)
   const [loading,setloading]=useState(true)
   
    //Create user
    const CreateNewUser=(email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
 

     // Profile update
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        }).then(() => {

            setuser({
                ...auth.currentUser,
                displayName: name,
                photoURL: photo,
            });
        });
    };
      useEffect(()=>{
     const  unsubscribe =  onAuthStateChanged(auth,currentUser=>{
            setuser(currentUser)
            setloading(false);
        })
        return()=>{
            unsubscribe();
            setuser(null)
        }
    },[])
    //LogIn
    const  login =(email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    //Logout
    const Logout=()=>{
        setloading(true)
        return signOut(auth)
    }
      //password reset email

    const passReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
   
   const authInfo={
    user,
    setuser,
    loading,
    setloading,
    updateUserProfile,
    passReset,
    login,
    CreateNewUser,
    Logout


   }
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default Authprovider;