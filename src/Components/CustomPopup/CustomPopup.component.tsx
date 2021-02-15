import React, { FunctionComponent, Fragment } from 'react'
import { DanceMap } from '../../Constants/dances';
import { getFilteredKeys } from '../../Utils/object';

type Props = {
    dances: DanceMap
}

type keys = 'follow' | 'lead';

const CustomPopup: FunctionComponent<Props> = ({ dances }: Props) => {
    const following = getFilteredKeys<DanceMap,keys>(dances, 'follow');
    const leading = getFilteredKeys<DanceMap,keys>(dances, 'lead');
    
    return (<Fragment>
        <p>Leading:{leading.map((dance, index) => <span key={index}>{dance}, </span>)}</p>
        <p>Following:{following.map((dance, index) => <span key={index}>{dance}, </span>)}</p>
        </Fragment>)

}

export default CustomPopup;