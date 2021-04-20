import Button from "../components/button/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TransactionList from "../containers/transactions/transactionList/TransactionList";
import { Link } from "react-router-dom";
import Wallet from "../containers/wallet/Wallet";

const HomePage = () => {
	return (
		<article>
			<Wallet />

			<div className="alignToRight">
				<Link to="/transaction/create">
					<Button icon={faPlus}>Add Transaction</Button>
				</Link>
			</div>
			<TransactionList />
		</article>
	);
};

export default HomePage;
