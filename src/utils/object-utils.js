export function arrayHasOnlySingleObjects(array) {
  return array.every((item) => isSimpleObject(item));
}

export function arrayHasOnlyPrimitives(array) {
  return array.every((item) => isPrimitive(item));
}

export function arrayHasNestedObject(array) {
  return array.some((item) => isNestedObject(item));
}

export function isNestedObject(object) {
  if (Array.isArray(object) || isPrimitive(object)) return false;

  return !isSimpleObject(object);
}

export function isSimpleObject(object) {
  if (Array.isArray(object) || isPrimitive(object)) return false;

  var isSimple = true;
  Object.keys(object).forEach((key) => {
    isSimple = isSimple && isPrimitive(object[key]);
  });

  return isSimple;
}

export function isPrimitive(object) {
  return object !== Object(object);
}
