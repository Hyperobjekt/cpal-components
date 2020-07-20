### Examples

Default Search:

```js
<Select
  color="primary"
  label={`Dropdown label`}
  items={[
    {
      label: `Option 1`,
      id: `one`,
      active: false
    },
    {
      label: `Option 2`,
      id: `two`,
      active: true
    },
  ]}
  handleSelect={e => {
    console.log('Item selected', e)
  }}
/>
```

### Classes and Styling
