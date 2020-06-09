### Examples

Default Search:

```js
<Select
  color="primary"
  parentClasses={`class-1 class-2`}
  label={`Dropdown label`}
  items={[
    {
      label: `Option 1`,
      id: `one`,
    },
    {
      label: `Option 2`,
      id: `two`,
    },
  ]}
  handleSelect={e => {
    console.log('Item selected', e)
  }}
/>
```

### Classes and Styling

This component accepts classes passed in from the parent in
the `parentClasses` string (for example, to distinguish it
from another select component in the view).
