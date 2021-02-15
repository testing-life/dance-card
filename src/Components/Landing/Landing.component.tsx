import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import * as ROUTES from '../../Constants/routes'
import Firebase from '../../Firebase/firebase'
import { RouteComponentProps, navigate, Router } from '@reach/router'
import { useAuth } from '../../Contexts/auth.context'

type Props = {
    firebase: Firebase
}

export const LandingComponent: FunctionComponent<Props> = ({firebase}: Props & RouteComponentProps) => {
    const {auth} = useAuth(); 


    useEffect(() => {
        auth.user ? navigate(ROUTES.HOME) : navigate(ROUTES.LOG_IN)
        // https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
        // https://usehooks.com/useAuth/
        // https://stackoverflow.com/questions/55366320/how-do-i-use-the-firebase-onauthstatechange-with-the-new-react-hooks
    }, [])

    return (<Fragment>

                    
    </Fragment>
    )
}