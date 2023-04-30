import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import './SocialNetworks.css'
export default function SocialNetworks({Titel, fontIcon ,Url , color ,size}) {
	return (
		<OverlayTrigger
		
			placement='bottom'
			overlay={<Tooltip id={`tooltip-bottom`}>{Titel}</Tooltip>}>
			<Link to={Url} className={`fa ${fontIcon} ${color} ${size} me-3 text-decoration-none ` } variant='white'></Link>
		</OverlayTrigger>
	);
}
