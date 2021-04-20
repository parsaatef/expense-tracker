import React, { useEffect, useState } from "react";
import { faPencilAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PriceBox.module.css";

interface Props {
	initialBalance: number;
	currentBalance: number;
	initialBalanceChange: (val: number) => void;
}

const PriceBox: React.FC<Props> = (props) => {
	const { initialBalance, currentBalance, initialBalanceChange } = props;

	const [realBalance, setRealBalance] = useState(
		initialBalance + currentBalance
	);

	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setRealBalance(initialBalance + currentBalance);
	}, [initialBalance, currentBalance]);

	const handleChangeInitialBalance = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const val = +e.target.value;
		if (val >= 0) {
			setHasError(false);
			initialBalanceChange(val);
			setRealBalance(val + currentBalance);
		} else {
			setHasError(true);
		}
	};

	const [editMode, setEditMode] = useState(false);

	const handleEdit = () => {
		setEditMode((prev) => !prev);
	};

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleEdit();
		}
	};

	return (
		<section className={styles.container}>
			<div className={styles.row + " " + styles.rowTop}>
				<div className="fontSizeSm">Wallet Balance</div>

				<div className="fontSizeSm">
					{new Date().toLocaleDateString(undefined, {
						month: "short",
						day: "2-digit",
						year: "numeric",
					})}
				</div>
			</div>

			<div className={styles.row + " " + styles.rowBottom}>
				<h2 className={styles.cost}>
					{editMode && (
						<>
							<input
								onChange={handleChangeInitialBalance}
								className={
									styles.balanceNumber +
									(hasError ? " hasError" : "")
								}
								type="number"
								value={initialBalance}
								min={0}
								onKeyDown={handleEnter}
							/>
							<span>
								{`${currentBalance < 0 ? " - " : " + "}
									$${currentBalance.toFixed(2)} = `}
							</span>
						</>
					)}

					<span>{"$" + realBalance.toFixed(2)}</span>

					{!editMode ? (
						<FontAwesomeIcon
							className={styles.icon}
							onClick={handleEdit}
							size="xs"
							color="rgb(243, 201, 87)"
							icon={faPencilAlt}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.icon}
							onClick={handleEdit}
							size="xs"
							color="rgb(243, 201, 87)"
							icon={faTimesCircle}
						/>
					)}
				</h2>

				<div className="fontSizeSm">USD</div>
			</div>
		</section>
	);
};

export default PriceBox;
