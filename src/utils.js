export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    // same as object.anchor.setTo(0.5, 0.5)
    object.anchor.setTo(0.5)
  })
}
