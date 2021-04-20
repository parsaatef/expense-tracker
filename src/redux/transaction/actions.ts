import {
	CREATE_TRANSACTION,
	UPDATE_TRANSACTION,
	DELETE_TRANSACTION,
	UPDATE_WALLET_BALANCE,
} from "./constants";
import {
	CreateTransactionAction,
	UpdateTransactionAction,
	DeleteTransactionAction,
	UpdateWalletBalanceAction,
	ActionPayload,
} from "./types";

export const createTransaction = (
	values: ActionPayload["values"]
): CreateTransactionAction => ({
	type: CREATE_TRANSACTION,
	payload: {
		values,
	},
});

export const updateTransaction = (
	values: ActionPayload["values"],
	id: ActionPayload["id"]
): UpdateTransactionAction => ({
	type: UPDATE_TRANSACTION,
	payload: {
		values,
		id,
	},
});

export const deleteTransaction = (
	id: ActionPayload["id"]
): DeleteTransactionAction => ({
	type: DELETE_TRANSACTION,
	payload: {
		id,
	},
});

export const updateWalletBalance = (
	initialBalance: ActionPayload["initialBalance"]
): UpdateWalletBalanceAction => ({
	type: UPDATE_WALLET_BALANCE,
	payload: {
		initialBalance,
	},
});
