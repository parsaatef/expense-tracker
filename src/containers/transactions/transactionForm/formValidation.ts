import { Transaction } from "../../../types";

/**
 * Form validation
 * @param param0 F
 * @returns
 */
const validateFields = (
	fields: Omit<Transaction, "id">
): {
	errors: string[];
	hasError: boolean;
} => {
	const { amount, note, date, category } = fields;

	let hasError = false;
	let errors = [];

	if (!amount || !isFinite(amount) || amount < 0) {
		errors.push("The Amount is not a valid number");
		hasError = true;
	}

	if (!note || typeof note !== "string") {
		errors.push("The Note is not a valid string");
		hasError = true;
	}

	const dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;

	if (!date || !dateReg.test(date)) {
		errors.push("The Date is not a valid date");
		hasError = true;
	}

	if (!category || !["expense", "income"].includes(category)) {
		errors.push("The category is not valid.");
		hasError = true;
	}

	return {
		errors,
		hasError,
	};
};

export default validateFields;
