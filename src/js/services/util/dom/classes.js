function add(e, ...classes) {
  e.classList.add.apply(e.classList, classes);
}

function remove(e, ...classes) {
  e.classList.remove.apply(e.classList, classes);
}

export default {remove, add};
