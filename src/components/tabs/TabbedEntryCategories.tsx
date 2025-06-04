import { Tabs } from "@kobalte/core/tabs";
import { For, type JSX, createSignal } from "solid-js";

import { TabsList } from "../tabs/TabsList";
import { TabsSquiggly } from "./TabsSquiggly";
import { TabsTrigger } from "./TabsTrigger";

export interface TabbedEntryCategoriesProps<Entry> {
	collection: string;
	initialCategories: Record<string, Entry[]>;
	renderCategory: (entries: Entry[]) => JSX.Element;
}

export function TabbedEntryCategories<Entry>(
	props: Readonly<TabbedEntryCategoriesProps<Entry>>,
) {
	const [selected, setSelected] = createSignal("All");

	return (
		<Tabs
			aria-label={`Tabs of ${props.collection} categories`}
			onChange={setSelected}
			value={selected()}
		>
			<TabsList>
				<TabsTrigger value={"All"}>
					<TabsSquiggly active={selected() === "All"}>{"All"}</TabsSquiggly>
				</TabsTrigger>
				<For each={Object.keys(props.initialCategories)}>
					{(category) => (
						<TabsTrigger value={category}>
							<TabsSquiggly active={category === selected()}>
								{category}
							</TabsSquiggly>
						</TabsTrigger>
					)}
				</For>
			</TabsList>

			<Tabs.Content value={"All"}>
				{props.renderCategory(Object.values(props.initialCategories).flat())}
			</Tabs.Content>
			<For each={Object.entries(props.initialCategories)}>
				{([category, entries]) => (
					<Tabs.Content value={category}>
						{props.renderCategory(entries)}
					</Tabs.Content>
				)}
			</For>
		</Tabs>
	);
}
