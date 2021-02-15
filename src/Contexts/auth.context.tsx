import React, { useState, useContext, useEffect } from 'react'
import { User as UserProfile } from '../Models/user.model';
import Firebase from '../Firebase/firebase';

type AuthConsumer = {
    auth: {
        initialising: boolean,
        user:any
    }
}

const AuthContext = React.createContext<AuthConsumer>({} as AuthConsumer);

type Props = {
    children: React.ReactNode,
    firebase?: Firebase
}

export const AuthProvider = ({ ...props }: Props) => {
    const [auth, setAuth] = useState<any>(() => {
        const user = props.firebase?.getCurrentUser();
        return { initialising: !user, user }
    })

    const onChange = (user: any) => {
        setAuth({ initialising: false, user })
    }

    useEffect(() => {
        const unsubscribe = props.firebase!.onAuthStateChanged(onChange);
        return () => unsubscribe()
    }, [])



    return <AuthContext.Provider value={{ auth }} {...props} />
}

const { Consumer: AuthConsumer } = AuthContext

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('must use in UserProvider');
    }
    return context;
}