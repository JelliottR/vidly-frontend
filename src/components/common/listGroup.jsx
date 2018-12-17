import React from 'react';

const ListGroup = (props) => {
	const { items, onItemSelect, textProperty, valueProperty } = props;
	return (
		<ul className='list-group'>
			{items.map((item) => (
				<li className='list-group-item' key={item[textProperty]} onClick={() => onItemSelect(item)}>
					{item[valueProperty]}
				</li>
			))}
		</ul>
	);
};

export default ListGroup;
