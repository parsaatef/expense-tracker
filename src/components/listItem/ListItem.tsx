import React from "react";
import styles from "./ListItem.module.css";

interface Props {
	category: "expense" | "income";
	note: string;
	amount: number;
	day: number;
	onClick?: () => void;
}

const ListItem: React.FC<Props> = (props) => {
	const { day, category, note, amount, onClick } = props;

	const notation = category === "expense" ? "-" : "+";

	const colorClass = category === "expense" ? "moneyExpense" : "moneyIncome";

	return (
		<section onClick={onClick} className={styles.container}>
			<h2>{day < 10 ? "0" + day : day}</h2>
			<div className={styles.noteCol}>
				<div className={styles.category}>{category}</div>
				<div className={styles.type}>{note}</div>
			</div>
			<div className={styles.moneyCol + " " + styles[colorClass]}>
				{`${notation}$${amount.toFixed(2)}`}
			</div>
		</section>
	);
};

export default ListItem;
