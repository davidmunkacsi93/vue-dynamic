export function isSimpleObject(object) {
  return !isNestedObject(object);
}

export function isNestedObject(object) {
  if (isPrimitive(object)) return false;

  return Object.keys(object).reduce(
    (acc, key) => acc && isPrimitive(object[key])
  );
}

export function isPrimitive(object) {
  return object !== Object(object);
}
