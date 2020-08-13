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
2. Commit that change: `git add * ; git commit -a -m 'Update package version to [version]'`.
2. Run `npm publish`. This builds two versions of the javascript library and the demo files. The libraries are pushed up to NPM's repository.
3. Commit the publish (so you don't dirty up your next working branch). `git add * && git commit -a -m 'Staging build'`.
4. Update the plugin in the site where you're using it: `git checkout -b update-explorer ; npm update cpal-components`.
5. Commit that update, merge to master, and push. `git add * ; git commit -a -m 'Update cpal-components' ; git checkout master ; git merge update-explorer ; git push origin master`

## Updating schools data

The client supplies a CSV to us with all the schools data, and this data changes frequently. These are the steps required to switch out this data.

1. Download the CSV from the shared client folder.
2. [Convert it from CSV to JSON](https://csvjson.com/csv2json). Select the minify option. Download the converted JSON file.
3. Rename the file to `schools.js`. Drop this into `./src/data`, replacing the existing `schools.js` file.
4. Open the file and add the following to the beginning of the file, before the opening bracket of the JSON: 
```
// prettier-ignore
export const schools = 
```
This prevents your text editor from shutting down when prettier tries to process the whole GD file. 
5. The file should now look something like this: 
```
// prettier-ignore
export const schools = [{"OBJECTID":1,"TEA":47,"SLN":47,"SCHOOLNAME":"Franklin International Exploratory Academy Middle School","LEVEL":"Middle","ADDRESS":"6920 Meadow Rd.","CITY":"Dallas","ZIP":75230,"PHONE":9725027100,"WEBSITE":"http://www.dallasisd.org/franklin","POINT_X":....
```
6. Save the file. Git commit. Publish a new version of the component library (see above).
