import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../../redux/reducer";
import { TransactionState, Transaction } from "../../../types";
import { selectTransactions } from "../../../redux/transaction/selectors";
import {
	createTransaction,
	updateTransaction,
	deleteTransaction,
} from "../../../redux/transaction/actions";
import TransactionForm from "./TransactionForm";

interface BaseProps {
	currId?: string;
}

const mapStateToProps = (state: RootState, props: BaseProps) => {
	const selectedState = createStructuredSelector<
		RootState,
		Partial<TransactionState>
	>({
		transactions: selectTransactions,
	});

	const { transactions = [] } = selectedState(state);

	const { currId } = props;

	return {
		currTransaction: transactions.find(
			(item: Transaction) => item.id === currId
		),
	};
};

const mapDispatchToProps = {
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = BaseProps & PropsFromRedux;

const TransactionFormContainer: React.FC<Props> = (props) => {
	const {
		createTransaction,
		updateTransaction,
		currId,
		currTransaction,
		deleteTransaction,
	} = props;

	const history = useHistory();

	/**
	 * redirect to home page if currId is not valid
	 */
	useEffect(() => {
		if (currId && !currTransaction) {
			history.replace("/");
		}
	}, [currTransaction, currId]);

	return (
		<TransactionForm
			createTransaction={createTransaction}
			updateTransaction={updateTransaction}
			currId={currId}
			currTransaction={currTransaction}
			deleteTransaction={deleteTransaction}
		/>
	);
};

export default connector(TransactionFormContainer);
