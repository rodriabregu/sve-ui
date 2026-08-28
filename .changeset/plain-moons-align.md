---
'sve-ui': minor
---

Renamed three sets of public CSS class names so a component's class matches its
name. **If you target any of these in your own stylesheet, update your selectors.**
Nothing else changed: same markup, same props, same behaviour.

| Before                         | After                        | Why                                                                        |
| ------------------------------ | ---------------------------- | -------------------------------------------------------------------------- |
| `sve-nav-menu`                 | `sve-navigation-menu`        | The only abbreviated class in the catalog                                  |
| `sve-nav-menu__*`              | `sve-navigation-menu__*`     | Its parts follow the root                                                  |
| `sve-field-group`              | `sve-field`                  | `Field` gets the name it always had a claim to                             |
| `sve-field-group__error`       | `sve-field__error`           |                                                                            |
| `sve-field-group__description` | `sve-field__description`     |                                                                            |
| `sve-field`                    | `sve-segmented-field`        | The date/time family shares this; it is a segmented input, not "a field"   |
| `sve-field-input`              | `sve-segmented-field__input` | Also fixes single-dash parts, which the rest of the library writes as `__` |
| `sve-field-label`              | `sve-segmented-field__label` |                                                                            |

`sve-segmented-field` is the shared root for `DateField`, `DatePicker`,
`DateRangeField`, `DateRangePicker`, `TimeField` and `TimeRangeField`. That
sharing is deliberate and unchanged — they are the same segmented input, so they
carry one class and one stylesheet.

The `data-sve-field-invalid` and `data-sve-field-control` attributes are
**unchanged**. They belong to `Field` and are what `focusFirstInvalidField`
matches on.

This is a minor release rather than a major one because the package is below
1.0, where the 0.x minor is the breaking slot.
