### Examples

Default Search:

```js
<Search
  parentClasses={`string`}
  colorClass={`string`}
  inputLabel={`string`}
  buttonLabel={`string`}
  handleSearch={e => {
    console.log('Search button clicked.')
  }}
></Search>
```

### Classes and Styling

This component accepts classes passed in from the parent in
the `parentClasses` string (for example, to distinguish it
from another search component in the view).
