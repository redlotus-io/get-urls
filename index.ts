import normalizeUrl from "normalize-url";
import type { Options as NormalizeUrlOptions } from "normalize-url";
import { isMatch, matches } from "super-regex";
import urlRegex from "url-regex-safe";

export type Options = {
  /**
	Extract URLs that appear as query parameters in the found URLs.

	@default false
	*/
  readonly extractFromQueryString?: boolean;

  /**
	Exclude URLs that match URLs in the given array.

	@default []
	*/
  readonly exclude?: string[];

  /**
	Require URLs to have a scheme or leading `www.` to be considered an URL. When `false`, matches against a list of valid TLDs, so it will match URLs like `unicorn.education`.

	Does not affect URLs in query parameters if using the `extractFromQueryString` option.

	@default false
	*/
  readonly requireSchemeOrWww?: boolean;
} & NormalizeUrlOptions;

const getUrlsFromQueryParameters = (url: string) => {
  const returnValue = new Set();
  const { searchParams } = new URL(url.replace(/^(?:\/\/|(?:www\.))/i, "http://$2"));

  for (const [, value] of searchParams) {
    if (isMatch(urlRegex({ exact: true }), value, { timeout: 500 })) {
      returnValue.add(value);
    }
  }

  return returnValue;
};

/**
Get all URLs in a string.

The URLs will be [normalized](https://github.com/sindresorhus/normalize-url).

@returns A `Set` of URLs.

@example
```
import getUrls from 'get-urls';

const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> Set {'http://sindresorhus.com', 'http://yeoman.io'}
```
*/
export const getUrls = (text: string, options: Options = {}): Set<string> => {
  if (typeof text !== "string") {
    throw new TypeError(`The \`text\` argument should be a string, got ${typeof text}`);
  }

  if (options.exclude !== undefined && !Array.isArray(options.exclude)) {
    throw new TypeError("The `exclude` option must be an array");
  }

  const returnValue: Set<string> = new Set();

  const add = (url: string) => {
    try {
      returnValue.add(normalizeUrl(url.trim().replace(/\.+$/, ""), options));
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const results = matches(
    urlRegex(
      options.requireSchemeOrWww === undefined
        ? undefined
        : {
            strict: options.requireSchemeOrWww,
            parens: true,
          },
    ),
    text,
    {
      matchTimeout: 500,
    },
  );

  for (const { match: url } of results) {
    add(url);

    if (options.extractFromQueryString) {
      const queryStringUrls = getUrlsFromQueryParameters(url) as Set<string>;
      for (const queryStringUrl of queryStringUrls) {
        add(queryStringUrl);
      }
    }
  }

  for (const excludedItem of options.exclude ?? []) {
    const regex = new RegExp(excludedItem);

    for (const item of returnValue) {
      if (isMatch(regex, item, { timeout: 500 })) {
        returnValue.delete(item);
      }
    }
  }

  return returnValue;
};
