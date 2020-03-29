export function arrayHasOnlySingleObjects(array) {
  return array.every((item) => isSimpleObject(item));
}

export function arrayHasOnlyPrimitives(array) {
  return array.every((item) => isPrimitive(item));
}

export function isNestedObject(object) {
  return !isSimpleObject(object);
}

export function isSimpleObject(object) {
  if (isPrimitive(object)) return true;

  var isSimple = true;
  Object.keys(object).forEach((key) => {
    isSimple = isSimple && isPrimitive(object[key]);
  });

  return isSimple;
}

export function isSingleObject(object) {
  return !Array.isArray(object) && typeof object === 'object';
}

export function isPrimitive(object) {
  return object !== Object(object);
}
