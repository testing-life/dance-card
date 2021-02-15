import React, { FunctionComponent } from 'react'

type Props = {
    label: string,
    register: any,
    dancePosition: {
        lead: boolean,
        follow: boolean
    }
}

const ProfileDanceItemComponent: FunctionComponent<Props> = ({ label, register, dancePosition }) => {
    return (
        <>
            <span>{label}</span>
            <label>
                Lead
          <input type="checkbox" data-lead="lead" defaultChecked={dancePosition.lead} name={label} ref={register} />
            </label>
            <label>
                Follow
          <input type="checkbox" data-follow="follow" defaultChecked={dancePosition.follow} ref={register} name={label} />
            </label>
            {/* <label> {label}</label >
            <input type="checbox" name={label} checked={checked} ref={register} /> */}
        </>
    )
}

export default ProfileDanceItemComponent;