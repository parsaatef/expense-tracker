import TransactionFormContainer from "../containers/transactions/transactionForm/TransactionFormContainer";
import { useParams } from "react-router";
import BackButton from "../components/backButton/BackButton";
import Wallet from "../containers/wallet/Wallet";

const PageEditTransaction = () => {
	const { id = "" }: { id?: string } = useParams();

	return (
		<article>
			<BackButton />

			<Wallet />

			<TransactionFormContainer currId={id} />
		</article>
	);
};

export default PageEditTransaction;
