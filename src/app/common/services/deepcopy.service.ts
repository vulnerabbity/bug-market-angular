export function makeDeepCopy<T>(object: T) {
  // javascript hack that allows make deep copy without libraries
  const deepCopy: T = JSON.parse(JSON.stringify(object))

  return deepCopy
}
