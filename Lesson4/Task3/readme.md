# Form

Try to do this form:
![Form](./form-example.png)

## **Common mistakes**

- Every field should have name attribute
- Every field should have label, which focuses input on label click

## **Requirements:**

Form should have different inputs with such types:

- `text`
- `number`
- `email`
- `checkbox`
- `radio`
- `password`
- `range`
- `time`
- `color`
- `date`

Also form should have a `textarea` and `select` elements.

Every field should have a label which focus the input by click. See reference [screenshot](./form-example.png) for label names. Every field should have a name attribute.

- You should use every of this attribute at least one time - `required`, `min`, `max`, `minlength`, `maxlength`, etc
- The email field should have placeholder value: '[email@example.com](mailto:email@example.com)'.
- The text fields should have disabled autocomplete.
- Add a button which submits the form.

Send form to [echo](https://echo.htmlacademy.ru/) server as POST-request
