export type TransactionCategory = "expense" | "income";

export interface Transaction {
	id: string;
	amount: number;
	note: string;
	date: string;
	category: TransactionCategory;
}

export interface TransactionState {
	transactions: Transaction[];
	initialBalance: number;
	currentBalance: number;
}
