# Chocolates: Hank's Component Library

Life is like a box of chocolates. At Hank, chocolates is a box of
visual components and default themeing to build UIs.

## Components

### Theme

Anything used from Hank's box of chocolates needs a theme context (we
just wrap styled-components `ThemeProvider` with a default
theme). Somewhere at the top of your app,

```tsx
// index.tsx
...
import { DefaultThemeProvider } from @hank/chocolates/theme;
...

ReactDOM.render(
  <DefaultThemeProvider>
    <App />
  </DefaultThemeProvider>,
  document.getElementById('root')
)
```

`DefaultThemeProvider` accepts a `theme` prop to override default
values. It's recommended that you import `defaultTheme` from
`@hank/chocolates/theme` and override values there.

### Grid: Container, Item, LayoutWrapper

For building responsive layouts, chocolates provides three components:

- `Container` -- essentially a flex interface with spacing controls
- `Item` -- Intended to be a child of `Container`, supports the
  same API as `Container`, while also supporting a responsive column
  grid system
- `LayoutWrapper` -- responsive max width/gutter system for building
  pages with content that won't spill to the edge of the screen

See `@hank/chocolates/grid` for supported props.

### Typography: H1, H2, ... P

See TextProps in `@hank/chocolates/typography` for props. Supports theming.

### Whitespace

For control over whitespace, you can use the `SpacingContainer`
component found in `@hank/chocolates/spacing`. All chocolate
components use `SpacingContainer` under the hood, and support all the
same padding props as `SpacingContainer`, so it'll be rare that you'll
need to use this component.

## Development

### Storybook

We use storybook to iterate on components in chocolates. Use `yarn run
storybook` to kick off a storybook webpack build.

### Deployment

```
yarn run build
yarn run publish
```

You'll need to log in to the npm command line as `hank-technology`
before running publish.
