### Examples

Default Header:

```js
<Header>
  <h1>Site Title</h1>
  <button>Menu</button>
</Header>
```

Sticky header that shrinks on scroll:

```js
<Header sticky={true} shrinkOffset={-80}>
  <h1>Site Title</h1>
  <button>Menu</button>
</Header>
```

### Classes and Styling

To override the base the header styles, apply styles to the
following classes:

- `.header`: styles applied to the root object
- `.header--shrink`: styles applied to the header when it is
  condensed
- `.header--sticky`: styles that are applied to a sticky
  header
