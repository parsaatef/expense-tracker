import { createSelector } from "reselect";
import { RootState } from "../reducer";

export const selectTransaction = (state: RootState) => state.transaction;

export const selectTransactions = createSelector(
	selectTransaction,
	(transaction) => transaction.transactions
);

export const selectInitialBalance = createSelector(
	selectTransaction,
	(transaction) => transaction.initialBalance
);

export const selectCurrentBalance = createSelector(
	selectTransaction,
	(transaction) => transaction.currentBalance
);
