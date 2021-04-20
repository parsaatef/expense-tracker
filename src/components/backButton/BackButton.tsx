import Button from "../button/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import styles from "./BackButton.module.css";

const BackButton = () => {
	const history = useHistory();

	const goBack = () => {
		history.goBack();
	};

	return (
		<div className={styles.container} onClick={goBack}>
			<Button textColor="secondary" variant="simple" icon={faArrowLeft}>
				back
			</Button>
		</div>
	);
};

export default BackButton;
