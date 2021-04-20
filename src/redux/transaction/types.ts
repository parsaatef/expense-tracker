import { Action } from "redux";
import { Transaction } from "../../types";
import {
	CREATE_TRANSACTION,
	UPDATE_TRANSACTION,
	DELETE_TRANSACTION,
	UPDATE_WALLET_BALANCE,
} from "./constants";

export interface ActionPayload {
	values?: Omit<Transaction, "id">;
	id?: string;
	initialBalance?: number;
}

export type CreateTransactionAction = Action<typeof CREATE_TRANSACTION> & {
	payload: {
		values: ActionPayload["values"];
	};
};

export type UpdateTransactionAction = Action<typeof UPDATE_TRANSACTION> & {
	payload: {
		values: ActionPayload["values"];
		id: ActionPayload["id"];
	};
};

export type DeleteTransactionAction = Action<typeof DELETE_TRANSACTION> & {
	payload: {
		id: ActionPayload["id"];
	};
};

export type UpdateWalletBalanceAction = Action<typeof UPDATE_WALLET_BALANCE> & {
	payload: {
		initialBalance: ActionPayload["initialBalance"];
	};
};

export type DispatchActionTypes =
	| CreateTransactionAction
	| UpdateTransactionAction
	| DeleteTransactionAction
	| UpdateWalletBalanceAction;
