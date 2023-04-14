import { JSX, createSignal, splitProps } from "solid-js";

import styles from "./Squiggly.module.css";
import { Text } from "./Text";
import clsx from "clsx";
import type { TextProps } from "./Text";

const alignStyles = {
	left: styles.left,
	right: styles.right,
};

export type SquigglyAlign = "left" | "right";

export type SquigglyProps<As extends keyof JSX.HTMLElementTags> = Omit<
	TextProps<As>,
	"children"
> & {
	align: SquigglyAlign;
	info: string;
	title: string;
};

export function Squiggly<As extends keyof JSX.HTMLElementTags>(
	props: SquigglyProps<As>
) {
	const [knownProps, textProps] = splitProps(props, [
		"align",
		"class",
		"info",
		"title",
	]);

	const idFromInfo = knownProps.info.replace(/[\W_]/g, "-").slice(0, 15);
	const [getTriggered, setTriggered] = createSignal(false);
	let myDiv!: HTMLDivElement;

	const unTrigger = () => {
		setTriggered(false);
		myDiv.blur;
		(myDiv.children[0] as HTMLElement).blur();
	};

	return (
		<div
			aria-describedby={idFromInfo}
			class={clsx([
				styles.squiggly,
				alignStyles[knownProps.align],
				getTriggered() && styles.triggered,
				knownProps.class,
			])}
			onBlur={unTrigger}
			onFocus={() => setTriggered(true)}
			onKeyDown={(event: KeyboardEvent) => {
				if (event.key === "Escape") {
					unTrigger();
					event.preventDefault();
				}
			}}
			ref={myDiv}
		>
			{/* @ts-expect-error - Dynamic components in TypeScript are tough. */}
			<Text
				{...textProps}
				class={styles.title}
				tabIndex={0}
				onBlur={unTrigger}
				onFocus={() => setTriggered(true)}
			>
				{knownProps.title}
			</Text>
			<div id={idFromInfo} class={styles.infoArea} role="tooltip">
				<Text as="div" class={styles.info} fontSize="smaller">
					{knownProps.info}
				</Text>
			</div>
		</div>
	);
}
