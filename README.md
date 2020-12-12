# Chocolates: Hank's Component Library

Life is like a box of chocolates. At Hank, chocolates is a box of
visual components and default themeing to build UIs.

This project is WIP, and will be iterated on as the Hank product
grows.

## Installation

```
yarn add @hank-technology/chocolates
```

## Components

### Theme

Anything used from Hank's box of chocolates needs a theme context (we
just wrap styled-components `ThemeProvider` with a default
theme). Somewhere at the top of your app,

```tsx
// index.tsx
...
import { DefaultThemeProvider, defaultTheme } from @hank/chocolates/theme;
...

ReactDOM.render(
  <DefaultThemeProvider theme={defaultTheme}>
    <App />
  </DefaultThemeProvider>,
  document.getElementById('root')
)
```

`DefaultThemeProvider` accepts a `theme` prop to override default
values. It's recommended that you override values on the imported
`defaultTheme` rather than attempting to build up a working theme
config from an empty object.

### Grid

```tsx
import { LayoutWrapper, Container, Item } from @hank-technology/chocolates;

...
<LayoutWrapper>
  <Container direction="column">
    <Item>Above</Item>
    <Item>Below</Item>
  </Container>
  <Container>
    <Item cols={6} smCols={12}>Left side (except mobile)</Item>
    <Item cols={6} smCols={12}>Right side (except mobile)</Item>
  </Container>
</LayoutWrapper>
...
```

For building responsive layouts, chocolates provides three components:

- `Container` -- essentially a flex interface with spacing controls
- `Item` -- Intended to be a child of `Container`, supports the same
  API as `Container`, while also supporting a responsive column grid
  system
- `LayoutWrapper` -- responsive max width/gutter system for building
  pages with content that won't spill to the edge of the screen

See `src/components/grid` for supported props.

### Typography

```tsx
import { H1, H2, H3, H4, H5, P } from @hank-technology/chocolates;

...
<H1>I am a big ol header</H1>
...
```

See TextProps in `src/components/typography.tsx` for supported
props. Inherits some styles from theming.

### Whitespace

For control over whitespace, you can use the `SpacingContainer`
component. All chocolate components use `SpacingContainer` under the
hood, and support all the same padding props as `SpacingContainer`, so
it'll be rare that you'll need to use this component.

## Development

### Storybook

We use storybook to iterate on components in chocolates. Use `yarn run storybook` to kick off a storybook webpack build.

### Deployment

Chocolates is published to npm as a public package under the
@hank-technology user. There are two kinds of deployment: stable &
alpha.

Alpha deploys apply an "-alpha-_SHA_" postfix to the latest stable's
semver, where _SHA_ is the 8-digit abbreviated SHA of the published
commit.

Stable deployments use semver and their changes have been tested on
all known clients via alpha versions.

You'll need to log in to the npm command line as `hank-technology`
before running publish.

#### Alpha deployment

1. Commit all changes with a meaningful commit.
1. Rebase and push to alpha branch (or make a PR to alpha and merge it)
1. Get the new short SHA with `git rev-parse --short=8 HEAD`
1. Tag the commit in github `git tag -a <version>` where version is the new version string
1. Push tags `git push --tags`
1. Update the version post-fix in package.json to include alpha and the SHA
1. Build and publish: `yarn build && yarn publish`
1. Clear any changes to package.json, no need to add a commit for the alpha version.

#### Stable deployment

1. Bump the version number in `package.json` according to semver standards
1. Commit all changes with a meaningful commit
1. Tag the commit in github `git tag -a <version>` where version is the new version string
1. Push tags `git push --tags`
1. Build and publish: `yarn build && yarn publish`
