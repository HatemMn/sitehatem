import { For } from "solid-js";

import { ContentEntry } from "../entries/ContentEntry";
import styles from "./ProjectEntry.module.css";
import { ProjectSubEntry } from "./ProjectSubEntry";
import type { Project, ProjectBase } from "~/types";
import { withBase } from "~/utils";

export interface ProjectEntryProps {
	project: Project;
}

function projectUrl({ owner = "HatemMn", repo, url }: ProjectBase) {
	return url ?? `https://github.com/${owner}/${repo}`;
}

function projectTitle(project: ProjectBase) {
	return project.name ?? project.repo;
}

export function ProjectEntry(props: Readonly<ProjectEntryProps>) {
	return (
		<ContentEntry
			description={props.project.description}
			image={
				props.project.image
					? {
							alt: `${projectTitle(props.project)} logo`,
							src: withBase(props.project.image),
							variant: "square",
						}
					: {
							alt: "Generic project logo",
							src: withBase("images/project-icon.png"),
							variant: "square",
						}
			}
			links={[
				["Repo", projectUrl(props.project)],
				...Object.entries(props.project.links ?? []),
			]}
			subtitle={props.project.role ?? "Creator & Maintainer"}
			title={projectTitle(props.project)}
			url={projectUrl(props.project)}
			widths="half"
		>
			{props.project.more && (
				<li>
					<ul class={styles.subList}>
						<For each={props.project.more}>
							{(more) => (
								<ProjectSubEntry
									description={more.description}
									href={projectUrl(more)}
									title={projectTitle(more)}
								/>
							)}
						</For>
					</ul>
				</li>
			)}
		</ContentEntry>
	);
}
