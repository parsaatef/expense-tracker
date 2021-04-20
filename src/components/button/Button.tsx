import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	children: React.ReactNode;
	type?: "button" | "submit";
	variant?: "normal" | "outline" | "simple";
	backColor?: "primary" | "secondary";
	textColor?: "white" | "black" | "primary" | "secondary";
	icon?: IconDefinition;
	className?: string;
}

type Rest = Exclude<
	React.ComponentPropsWithoutRef<"button">,
	"type" | "className"
>;

const Button: React.FC<Props & Rest> = (props) => {
	const {
		children,
		type = "button",
		variant = "normal",
		backColor = "primary",
		textColor,
		icon,
		className = "",
		...rest
	} = props;

	let classes = [styles.button];

	if (variant !== "simple") {
		if (variant === "outline") {
			classes.push(styles.outline);
		}

		classes.push(styles[backColor]);
	} else {
		classes.push(styles.simple);
	}

	if (textColor) {
		classes.push(styles[`text-${textColor}`]);
	}

	return (
		<button
			className={(className ? className + " " : "") + classes.join(" ")}
			type={type}
			{...(rest as Rest)}
		>
			{icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
			{children}
		</button>
	);
};

export default Button;
