[![Build Status](https://travis-ci.org/advanced-rest-client/http-method-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/http-method-selector)  

# http-method-selector

A HTTP method selector. Displays list of radio buttons with common
http methods and a dropdown with less common but still valid methods.

User can define his own methos whe selects "custom" option in the dropdown menu.
Because of this the element do not support validation of any kind and hosting
application should provide one if required.

### Example
```
<http-method-selector></http-method-selector>
```

### Styling
`<http-method-selector>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--http-method-selector` | Mixin applied to the element | `{}`



### Events
| Name | Description | Params |
| --- | --- | --- |
| request-is-payload-changed | Fired when the `isPayload` computed property value chnage. | value **Boolean** - Current state. |
| request-method-changed | Fired when a method has been selected. | value **Boolean** - Current HTTP method name. |
