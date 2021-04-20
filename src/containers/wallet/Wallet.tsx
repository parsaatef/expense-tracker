import PriceBox from "../../components/priceBox/PriceBox";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/reducer";
import { TransactionState } from "../../types";
import {
	selectInitialBalance,
	selectCurrentBalance,
} from "../../redux/transaction/selectors";
import { updateWalletBalance } from "../../redux/transaction/actions";

const mapStateToProps = createStructuredSelector<
	RootState,
	Partial<TransactionState>
>({
	initialBalance: selectInitialBalance,
	currentBalance: selectCurrentBalance,
});

const mapDispatchToProps = {
	updateWalletBalance,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Wallet: React.FC<Props> = (props) => {
	const { initialBalance, currentBalance, updateWalletBalance } = props;

	return (
		<PriceBox
			initialBalance={initialBalance || 0}
			currentBalance={currentBalance || 0}
			initialBalanceChange={updateWalletBalance}
		/>
	);
};

export default connector(Wallet);
