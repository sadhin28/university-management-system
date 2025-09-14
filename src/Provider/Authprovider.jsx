
import  { createContext, useState } from 'react';
import { useEffect} from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
export const AuthContext= createContext();
const auth = getAuth(app)
const Authprovider = ({children}) => {
   const [user,setuser]=useState(null)
   const [loading,setloading]=useState(true)
   const [role, setRole] = useState("student");
   const [userData,setUserData]=useState([])
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
     const  unsubscribe =  onAuthStateChanged(auth,async (currentUser)=>{
        if(currentUser){
           setuser(currentUser)
           const tokenResult=await currentUser.getIdTokenResult(true)
           setRole(tokenResult.claims.role || "student")
        }else{
            setuser(null)
            setRole(null)
        }   
       
         setloading(false);
        })
        return()=>{
            unsubscribe();
            
        }
    },[])
    //LogIn
    const login =(email,password)=>{
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
    role,
    user,
    setuser,
    loading,
    setloading,
    updateUserProfile,
    passReset,
    login,
    CreateNewUser,
    Logout,
    setUserData


   }
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default Authprovider;