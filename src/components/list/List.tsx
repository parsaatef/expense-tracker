import React from "react";
import ListItem from "../listItem/ListItem";

interface Props {
	items: [];
}

const List: React.FC<Props> = (props) => {
	const { items } = props;

	return (
		<section>
			{items.map(({ day, category, note, amount }) => (
				<ListItem
					day={day}
					category={category}
					note={note}
					amount={amount}
				/>
			))}
		</section>
	);
};

export default List;
