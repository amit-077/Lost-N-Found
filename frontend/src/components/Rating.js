import React from 'react';

const Rating = ({ category, subcategory, color }) => {
	return (
		<div className="rating">
			<span>{category && subcategory}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

export default Rating;
