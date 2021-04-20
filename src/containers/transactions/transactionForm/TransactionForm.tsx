import React, { useState } from "react";
import Label from "../../../components/label/Label";
import Button from "../../../components/button/Button";
import styles from "./TransactionForm.module.css";
import { useHistory } from "react-router";
import { Transaction, TransactionCategory } from "../../../types";
import { ActionPayload } from "../../../redux/transaction/types";
import validateFields from "./formValidation";

interface Values {
	amount: number | "";
	note: string;
	date: string;
	category: TransactionCategory | "";
}

interface Props {
	createTransaction: (values: ActionPayload["values"]) => void;
	updateTransaction: (
		values: ActionPayload["values"],
		id: ActionPayload["id"]
	) => void;
	currId?: string;
	currTransaction?: Transaction;
	deleteTransaction: (id: ActionPayload["id"]) => void;
}

const TransactionForm: React.FC<Props> = (props) => {
	const {
		createTransaction,
		updateTransaction,
		currId,
		currTransaction,
		deleteTransaction,
	} = props;

	const history = useHistory();

	const [formErrors, setError] = useState<string[]>([]);
	/**
	 * handle Submit the form
	 * @param e
	 */
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const finalValues = values as ActionPayload["values"];

		const { errors, hasError } = validateFields(finalValues!);

		if (!hasError) {
			if (currId && currTransaction) {
				updateTransaction(finalValues, currId);
			} else if (!currId) {
				createTransaction(finalValues);
			}

			history.push("/");
		} else {
			setError(errors);
		}
	};

	/**
	 * Delete current transaction
	 */
	const handleDelete = () => {
		deleteTransaction(currId);
		history.replace("/");
	};

	/**
	 * Cancel adding or updating
	 */
	const handleCancel = () => {
		history.goBack();
	};

	const [values, setValues] = useState<Values>({
		amount: currTransaction?.amount || "",
		note: currTransaction?.note || "",
		date: currTransaction?.date || "",
		category: currTransaction?.category || "",
	});

	/**
	 * Handle change form fields
	 * @param name
	 * @param e
	 */
	const handleChange = (
		name: string,
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		setValues((prev) => ({
			...prev,
			[name]: e.target.value,
		}));
	};

	const { amount, note, date, category } = values;

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.fields}>
				<div>
					<Label>Enter amount</Label>
					<input
						onChange={handleChange.bind(null, "amount")}
						type="number"
						value={amount}
						required
						min={0}
					/>
				</div>

				<div>
					<Label>Note</Label>
					<textarea
						onChange={handleChange.bind(null, "note")}
						value={note}
						required
					/>
				</div>

				<div>
					<Label>Date</Label>
					<input
						type="date"
						value={date}
						onChange={handleChange.bind(null, "date")}
						pattern="\d{4}-\d{2}-\d{2}"
						required
					/>
				</div>

				<div>
					<Label>Category</Label>
					<select
						value={category}
						onChange={handleChange.bind(null, "category")}
						required
					>
						<option value=""> select </option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
				</div>
			</div>

			<div className={styles.divider} />

			<div className={styles.actions}>
				<Button
					onClick={handleCancel}
					variant="simple"
					className={styles.leftCol}
				>
					Cancel
				</Button>

				{currId && (
					<Button onClick={handleDelete} variant="simple">
						Delete
					</Button>
				)}

				<Button type="submit">Save Transaction</Button>
			</div>

			{formErrors.length > 0 && (
				<div>
					{formErrors.map((err, index) => (
						<div key={index}>{err}</div>
					))}
				</div>
			)}
		</form>
	);
};

export default TransactionForm;
