import { Transaction } from "../types";

type ComparatorResult = 1 | -1 | 0;

type Order = "asc" | "desc";

export function descendingComparator<T>(
	a: T,
	b: T,
	orderBy: keyof T
): ComparatorResult {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => ComparatorResult {
	return order === "desc"
		? (a, b): ComparatorResult => descendingComparator(a, b, orderBy)
		: (a, b): ComparatorResult =>
				-descendingComparator(a, b, orderBy) as ComparatorResult;
}

export function objectArrSort<T>(
	array: T[],
	comparator: (a: T, b: T) => ComparatorResult
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const getDateArr = (date: string) => {
	let dateArr: string[] = [];

	if (date.includes("-")) {
		dateArr = date.split("-");
	} else if (date.includes("-")) {
		dateArr = date.split(".");
	}

	return dateArr;
};

/**
 * Dates format would be yyyy-mm-dd or yyyy.mm.dd
 */
export const getDayFromDate = (date: string) => {
	const [, , day] = getDateArr(date);

	return Number(day);
};

export const groupingTransactionsByDate = (
	transactions: (Transaction & { day: number })[]
) => {
	const groupedArr: {
		[key: string]: (Transaction & { day: number })[];
	} = {};

	for (let transaction of transactions) {
		const { date } = transaction;

		const [year, month] = getDateArr(date);

		const key = `${year}-${month}`;

		if (!groupedArr[key]) {
			groupedArr[key] = [];
		}

		groupedArr[key].push(transaction);
	}

	return groupedArr;
};

export const getCurrentBalance = (transactions: Transaction[]) => {
	return transactions.reduce((prev, curr) => {
		let amount = +curr.amount;

		amount = curr.category === "income" ? amount : -amount;

		return prev + amount;
	}, 0);
};
