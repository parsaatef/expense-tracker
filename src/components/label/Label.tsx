import React from "react";
import styles from "./Label.module.css";

interface Props {
	children: React.ReactNode;
}

const Label: React.FC<Props> = (props) => {
	const { children } = props;

	return <label className={styles.label}>{children}</label>;
};

export default Label;
