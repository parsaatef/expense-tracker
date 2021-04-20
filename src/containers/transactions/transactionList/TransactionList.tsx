import React, { Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import ListItem from "../../../components/listItem/ListItem";
import styles from "./TransactionList.module.css";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../../redux/reducer";
import { TransactionState } from "../../../types";
import { selectTransactions } from "../../../redux/transaction/selectors";
import { useHistory } from "react-router";
import {
	objectArrSort,
	getComparator,
	getDayFromDate,
	groupingTransactionsByDate,
} from "../../../helper/utility";

const mapStateToProps = createStructuredSelector<
	RootState,
	Partial<TransactionState>
>({
	transactions: selectTransactions,
});

const connector = connect(mapStateToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const TransactionList: React.FC<Props> = (props) => {
	const { transactions = [] } = props;

	const history = useHistory();

	const handleClick = (id: string) => {
		history.push(`/transaction/edit/${id}`);
	};

	const sortedGroupedTransactions = React.useMemo(() => {
		const newArr = objectArrSort(
			transactions,
			getComparator("desc", "date")
		).map((item) => {
			return { ...item, day: getDayFromDate(item.date) };
		});

		return groupingTransactionsByDate(newArr);
	}, [transactions]);

	return (
		<section className={styles.container}>
			{Object.keys(sortedGroupedTransactions).map((group) => (
				<Fragment key={group}>
					<h5 className={styles.listHeading}>
						{new Date(group).toLocaleDateString(undefined, {
							month: "short",
							year: "numeric",
						})}
					</h5>
					{sortedGroupedTransactions[group].map(
						({ day, category, note, amount, id }) => (
							<ListItem
								key={id}
								onClick={handleClick.bind(null, id)}
								day={day}
								category={category}
								note={note}
								amount={Number(amount)}
							/>
						)
					)}
				</Fragment>
			))}
		</section>
	);
};

export default connector(TransactionList);
