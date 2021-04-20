import TransactionFormContainer from "../containers/transactions/transactionForm/TransactionFormContainer";
import { RouteComponentProps } from "react-router";
import BackButton from "../components/backButton/BackButton";
import Wallet from "../containers/wallet/Wallet";

type Props = RouteComponentProps;

const PageAddTransaction: React.FC<Props> = (props) => {
	return (
		<article>
			<BackButton />

			<Wallet />

			<TransactionFormContainer />
		</article>
	);
};

export default PageAddTransaction;
