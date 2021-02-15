import React, { FunctionComponent } from 'react'
import { useAuth } from '../../Contexts/auth.context'
import { LoginPage } from '../../Pages/Login'

const PrivateRoute:FunctionComponent<any> = ({ as: Component, ...props }) => {
    const { auth } = useAuth()
    return (
        <div>
            {auth.user ? <Component {...props} /> : <LoginPage />}
        </div>
    )
}

export default PrivateRoute