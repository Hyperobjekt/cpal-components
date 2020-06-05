# Initial Planning (June 4, 2020)

## Implementation

- Base components:
  [reactstrap](https://reactstrap.github.io/)
- State management:
  [zustand](https://github.com/react-spring/zustand)
  - manage state using a store for each module that need to
    share state between components
- CRI Tool Routing:
  [react router v6](https://reacttraining.com/blog/react-router-v6-pre/)
  - planning on using hash based routing for user options:
    - ({view},{map-view},{active-layers},{active-index},{active-school},{active-filters},{weighting-properties})

## Structure

This repository contains contains all components within the
[component inventory](https://www.figma.com/file/GJkqaXccxuF4Lt776dEwHG/CPAL?node-id=46%3A410),
broken down into modules.

See
[Using index.js for Fun and Public Interfaces](https://alligator.io/react/index-js-public-interfaces/)
for example of modular structure

The top level modules in this project include:

- `core`: contains all core components that are
  presentational and do not contain any business logic
  - as the core grows, we may move it to a different
    repository so it can serve as a component library for
    future projects
- `cpal`: contains components specific to the CPAL project
  that have CPAL related business logic

## Development Practices

- Code Formatting: [Prettier](https://prettier.io/) (using
  .prettierrc config)
  - [Atom plugin](https://atom.io/packages/prettier-atom)
  - [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Prefer functional components using hooks instead of class
  based components

All modules should:

- Contain an `index.js` the exports any components required
  by other modules

All components should:

- Should opt to use functional components with hooks over
  class components
- Have a `Component.md` that document example usage
- document props accepted using `Component.propTypes`
- provide default props via `Component.defaultProps`

[React Styleguidist](https://react-styleguidist.js.org/)
