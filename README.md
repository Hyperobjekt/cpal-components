# CPAL Components

## Getting Started

Run `npm install` to install required dependencies, then run
one of the following:

- `npm run start`: this starts the explorer and serves the
  explorer component from `/src/modules/cpal/explorer`
- `npm run styleguide`: this starts the style guide which
  shows all components available in this repository, along
  with documentation and examples.

## Using components from this library

To use components from this library, first add the repo
using npm:

```
npm install git+ssh://git@github.com:Hyperobjekt/cpal-components.git
```

You can then import any components into your project.

```jsx
import { Header } from 'cpal-components'

function AppHeader() {
  return (
    <div className="page">
      <Header />
      <div className="body">Sample page</div>
    </div>
  )
}
```
