import firebase from "firebase/compat";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type User = {
    id: string,
    name: string,
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }
type AuthContextProviderProps = {
    children:ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();
    
    //observa se houve alguma alteração no estado de autenticação do usuario
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){        
            const {displayName, photoURL, uid} = user;
   
            if(!displayName || !photoURL) {
              throw new Error('Missing information from google account')
            }
   
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })         
        } 
      })
     
      return () => {
        unsubscribe();
      }

    }, [])
    //login com o google pegando id, anome e avatar
    async function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider;
  
      const result = await auth.signInWithPopup(provider);
     
         if (result.user){
           const {displayName, photoURL, uid} = result.user;
  
           if(!displayName || !photoURL) {
             throw new Error('Missing information from google account')
           }
  
           setUser({
             id: uid,
             name: displayName,
             avatar: photoURL
           })
         } 
     
    }
    return(
      //contexto utilizando a tipagem do typescript para compartilhar informação
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}