const state = []
const keepState = []
const useState = function (defaultValue) {
  const i = state.length
  keepState[i] = keepState[i] === undefined ? defaultValue : keepState[i]
  state[i] = keepState[i]
  const setState = function (value) {
    if (typeof value === 'function') {
      keepState[i] = value(keepState[i])
    } else {
      keepState[i] = value
    }
    state.splice(0)
    window.renderFunction()
  }
  const getState = function () {
    return state[i]
  }
  return [getState, setState]
}

const id = function () { 
  return Math.ceil(Math.random()*100000-1);
};

const formValues = {}
const handleOnChange = function (event) {
  const name =
    event.target.getAttribute('name') || event.target.getAttribute('id')
  formValues[name] = event.target.value || ''
}
const setFormElement = function (name, value = '') {
  if (typeof name === 'string') {
    const elem =
      document.getElementsByName(name)[0] || document.getElementById(name)
    if (elem) {
      elem.value = value
    }
  } else if (name.constructor === Array) {
    name.forEach((item) => setFormElement(item, value))
  }
}
