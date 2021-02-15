import React, { useState, useContext, useEffect } from 'react'
import { User as UserProfile } from '../Models/user.model';

type UserConsumer = {
    user: UserProfile
    setUser: (val: UserProfile) => void
    clearUser: () => void
    getUserFromStorage: () => UserProfile
}

const userStorageType = 'user';

const UserContext = React.createContext<UserConsumer>({} as UserConsumer);

type Props = {
    children: React.ReactNode
}

export const UserProvider = ({ ...props }: Props) => {
    const [user, setUserInState] = useState<UserProfile>({} as UserProfile)

    const getUserFromStorage = () => JSON.parse(localStorage.getItem(userStorageType) as string);

    useEffect(() => {
        const storageUser = getUserFromStorage();
        if (storageUser) { setUser(storageUser)} 
        // storageUser ? setUser(user) : setUser(UserProfile.create())
    }, [])


    const setUser = (newUser: UserProfile): void => {
        if (newUser) {setUserInState(newUser)} //merge rather than overwrite
    }
    
    const clearUser = ()=> localStorage.removeItem(userStorageType);
    // const clearUser = (): Promise<any> => Promise.resolve(() => {console.log('does it?');
    //  localStorage.removeItem(userStorageType) })
    

    return <UserContext.Provider value={{ user, setUser, getUserFromStorage, clearUser }} {...props} />
}

const { Consumer: UserConsumer } = UserContext

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('must use in UserProvider');
    }
    return context;
}