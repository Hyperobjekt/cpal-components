## Prerequisites

[Node.js](http://nodejs.org/) >= 10 must be installed.

## Installation

- Running `npm install` in the component's root directory
  will install everything you need for development.

## Development Server

- `npm run start` will run a development server with the
  explorer's demo at
  [http://localhost:3000](http://localhost:3000) with hot
  module reloading.
- `npm run styleguide` will run a development server that
  shows each component in the component library, along with
  usage and examples at
  [http://localhost:6060](http://localhost:6060)

## Running Tests

- `npm run test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a
  coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to
  npm and also bundle the demo app.

- `npm run clean` will delete built resources.

# Creating a new component

Component documentation is automatically generated using
[react-styleguidist](https://github.com/styleguidist/react-styleguidist)
and can be viewed by running `npm run styleguidist`. Be sure
to follow the process below when creating components so the
documentation is generated correctly.

1. Make sure the component is placed correctly in the
   structure
   1. Presentational components without any business logic
      should go in `/src/modules/core` so they can easily be
      reused
   2. Components with business logic that are specific to a
      project should go in the corresponding project folder
      (e.g. `/src/modules/cpal`)
2. Each component should have its own folder with the
   following:
   1. A `.js` file corresponding to the component name that
      contains the react component (e.g. `Header.js`)
      - should contain a `propTypes` definition with a
        comment that describes each prop along with its type
      - should contain a `defaultProps` definition that sets
        default values to any props that need them.
   2. A `.css` file corresponding to the component name that
      contains the base styles for the component. (e.g.
      `Header.css`)
   3. A `.md` file corresponding to the component name that
      contains examples of how to use the component, and any
      other relevant documentation (e.g. `Header.md`)
   4. A `index.js` file that exports the component, and any
      other sub-components that need to be shared

See `/src/modules/core/Header`
([link](https://github.com/Hyperobjekt/cpal-components/tree/master/src/modules/core/Header))
for an example of what a component should look like.
