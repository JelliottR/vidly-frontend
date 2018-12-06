import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = (props) => {
	return (
		<div>
			<FontAwesomeIcon
				icon={props.liked === true ? [ 'fas', 'heart' ] : [ 'far', 'heart' ]}
				onClick={() => props.onLiked()}
				style={{ cursor: 'pointer' }}
			/>
		</div>
	);
};

export default Like;
