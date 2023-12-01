import type { Options as NormalizeUrlOptions } from "normalize-url";
export type Options = {
    readonly extractFromQueryString?: boolean;
    readonly exclude?: string[];
    readonly requireSchemeOrWww?: boolean;
} & NormalizeUrlOptions;
export declare const getUrls: (text: string, options?: Options) => Set<string>;
