# Initial Planning (June 4, 2020)

## Structure

- Component library (this repository)
  - contains all components within the [component inventory](https://www.figma.com/file/GJkqaXccxuF4Lt776dEwHG/CPAL?node-id=46%3A410), broken down into modules
  - bundled as ES modules so all components can be used in the Gatsby site
  - See [Using index.js for Fun and Public Interfaces](https://alligator.io/react/index-js-public-interfaces/) for example of modular structure
  - each module should have a `README.md` that outline the exported components and the props they accept

## Development Practices

- Code Formatting: [Prettier](https://prettier.io/) (using .prettierrc config)
  - [Atom plugin](https://atom.io/packages/prettier-atom)
  - [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Implementation

- Base components: [reactstrap](https://reactstrap.github.io/)
- State management: [zustand](https://github.com/react-spring/zustand)
  - manage state using a store for each module that need to share state between components
- CRI Tool Routing: [react router v6](https://reacttraining.com/blog/react-router-v6-pre/)
  - planning on using hash based routing for user options:
    - ({view},{map-view},{active-layers},{active-index},{active-school},{active-filters},{weighting-properties})
