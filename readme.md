![RedLotus-Logo-Dark](.github/base-logo-dark-mode.svg#gh-dark-mode-only)
![RedLotus-Logo-Light](.github/base-logo-light-mode.svg#gh-light-mode-only)

## Redlotus fork for adding CommonJS support

# get-urls

> Get all URLs in a string

The URLs will be [normalized](https://github.com/sindresorhus/normalize-url).

*Do not use this for any kind of security-related validation.*

Please note the [known limitation](https://github.com/niftylettuce/url-regex-safe#limitations). You can work around this by setting `requireSchemeOrWww` to `true`.

## Install

```sh
npm install @redlotus/get-urls

yarn add @redlotus/get-urls
```

## Usage

```js
import { getUrls } from '@redlotus/get-urls';

const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> Set {'http://sindresorhus.com', 'http://yeoman.io'}
```

## API

### getUrls(text, options?)

Returns a `Set` of URLs.

### text

Type: `string`

### options

Type: `object`

All the `normalize-url` [options](https://github.com/sindresorhus/normalize-url#options) in addition to:

#### extractFromQueryString

Type: `boolean`\
Default: `false`

Extract URLs that appear as query parameters in the found URLs.

#### exclude

Type: `string[]`\
Default: `[]`

Exclude URLs that match URLs in the given array.

#### requireSchemeOrWww

Type: `boolean`\
Default: `false`

Require URLs to have a scheme or leading `www.` to be considered an URL. When `false`, matches against a list of valid TLDs, so it will match URLs like `unicorn.education`.

Does not affect URLs in query parameters if using the `extractFromQueryString` option.

## Related

- [get-urls-cli](https://github.com/sindresorhus/get-urls-cli) - CLI for this module
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text
