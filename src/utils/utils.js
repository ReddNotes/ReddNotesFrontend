// generate error
export function generateErrorMessage(errors) {
  if (errors.valueMissing) return 'Please fill out this field';
  if (errors.patternMismatch) return 'Please enter a valid value';
  if (errors.rangeOverflow) return 'Value is too high';
  if (errors.rangeUnderflow) return 'Value is too low';
  if (errors.stepMismatch) return 'Value does not fit the required steps';
  if (errors.tooLong) return 'Value is too long';
  if (errors.tooShort) return 'Value is too short';
  if (errors.typeMismatch) return 'Invalid value type';
  if (errors.customError) return 'An error occurred';
  if (errors.badInput) return 'Invalid input';

  return '';
}
