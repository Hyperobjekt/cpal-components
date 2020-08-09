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

## Publishing changes

This library can be published via NPM. 

1. Increment the package version in `package.json`.
2. Run 'npm publish'. This builds two versions of the javascript library and the demo files. The libraries are pushed up to NPM's repository.
3. Commit the publish (so you don't dirty up your next working branch). `git add * && git commit -a -m 'Publish version [version]'`.
4. Update the plugin in the site where you're using it: `npm update cpal-components`.
5. Commit that update, merge to master, and push. `git add * ; git commit -a -m 'Update cpal-components' ; git checkout master ; git merge ; git push origin master`
