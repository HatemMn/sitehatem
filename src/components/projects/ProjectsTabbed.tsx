import { For } from "solid-js";

import { EntryList } from "../entries/EntryList";
import { TabbedEntryCategories } from "../tabs/TabbedEntryCategories";
import { ProjectEntry } from "./ProjectEntry";
import type { Project } from "~/types";

export interface ProjectsTabbedProps {
	projectsByCategory: Record<string, Project[]>;
}

export function ProjectsTabbed(props: Readonly<ProjectsTabbedProps>) {
	return (
		<TabbedEntryCategories
			collection="project"
			initialCategories={props.projectsByCategory}
			renderCategory={(projects) => (
				<EntryList>
					<For each={projects.sort((a, b) => a.repo.localeCompare(b.repo))}>
						{(project) => <ProjectEntry project={project} />}
					</For>
				</EntryList>
			)}
		/>
	);
}
