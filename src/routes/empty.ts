import { routeData } from "../routeData";

export type Empty = () => {};

export const empty = (path: string) => routeData(() => ({}), { path });
