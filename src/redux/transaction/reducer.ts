import {
	CREATE_TRANSACTION,
	UPDATE_TRANSACTION,
	DELETE_TRANSACTION,
	UPDATE_WALLET_BALANCE,
} from "./constants";
import { ActionPayload } from "./types";
import { TransactionState } from "../../types";
import { AnyAction } from "redux";
import { getCurrentBalance } from "../../helper/utility";

export const initialState: TransactionState = {
	initialBalance: 0,
	transactions: [],
	currentBalance: 0,
};

const transactionReducer = (
	state: TransactionState = initialState,
	action: AnyAction
): TransactionState => {
	const payload: ActionPayload = action.payload;

	switch (action.type) {
		case CREATE_TRANSACTION:
			const newTransactions = [...state.transactions];

			if (payload.values) {
				newTransactions.push({
					id: `${Date.now()}`,
					...payload.values,
				});
			}

			return {
				...state,
				transactions: newTransactions,
				currentBalance: getCurrentBalance(newTransactions),
			};

		case UPDATE_TRANSACTION:
			let updatedTransactions = [...state.transactions];

			if (payload.values) {
				updatedTransactions = updatedTransactions.map((item) => {
					if (payload.id === item.id) {
						return {
							...item,
							...payload.values,
						};
					}

					return item;
				});
			}

			return {
				...state,
				transactions: updatedTransactions,
				currentBalance: getCurrentBalance(updatedTransactions),
			};

		case DELETE_TRANSACTION:
			let filteredTransactions = [...state.transactions];
			if (payload.id) {
				filteredTransactions = filteredTransactions.filter(
					(item) => payload.id !== item.id
				);
			}

			return {
				...state,
				transactions: filteredTransactions,
				currentBalance: getCurrentBalance(filteredTransactions),
			};

		case UPDATE_WALLET_BALANCE:
			return {
				...state,
				initialBalance: payload.initialBalance || 0,
				currentBalance: getCurrentBalance(state.transactions),
			};

		default:
			return state;
	}
};

export default transactionReducer;
