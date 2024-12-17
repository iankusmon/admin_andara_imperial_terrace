// Yup with custom method

import * as Yup from 'yup'
import { filter, get, isEmpty } from 'lodash'

/** validate unique property  */
Yup.addMethod(Yup.array, 'uniqueProperty', function(propertyPath, message) {
  return this.test('unique', '', function(list) {
    const errors = []

    // add guard to skip the unique validation if list is undefined
    if (!list) return

    list.forEach((item, index) => {
      const propertyValue = get(item, propertyPath)

      if (propertyValue && filter(list, [ propertyPath, propertyValue ]).length > 1) {
        errors.push(
          this.createError({
            path: `${this.path}.${index}.${propertyPath}`,
            message
          })
        )
      }
    })

    if (!isEmpty(errors)) {
      /**
       * Got error
       * ! Warning: An unhandled error was caught during validation in <Formik validationSchema /> TypeError:
       * ! Cannot read property 'indexOf' of undefined
       *
       * might fix later so we can display the message to ALL field from errors array
       * TODO: throw new Yup.ValidationError(errors)
       *
       * currently, we only return the first index of error
       */
      return errors[0]
    }

    return true
  })
})

export default Yup