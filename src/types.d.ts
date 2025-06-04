// https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/214
declare module "@eslint-community/eslint-plugin-eslint-comments/configs" {
	import type eslint from "eslint";
	export const recommended: eslint.Linter.ConfigWithExtends;
}

interface Project extends ProjectBase {
	more?: ProjectBase[];
}
interface ProjectBase {
	description: string;
	image?: string;
	links?: Record<string, string>;
	name?: string;
	owner?: string;
	repo: string;
	role?: string;
	url?: string;
}
interface ProjectCategory {
	description: string;
	projects: Project[];
}

export type { Project, ProjectBase, ProjectCategory };
