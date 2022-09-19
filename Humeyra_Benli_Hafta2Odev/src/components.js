const AccountHolder = function (props) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${props.name}</span><span>${props.balance}</span><span>${props.buttonProduct}</span><span>${props.buttonAccount}</span>
    </li>`
}

const AccountHolderList = function (props) {
  console.log("props",props.list)
  return `
    <ul class="list-group list-group-flush" id="account-holders-list">
      ${props.list.map((item) => AccountHolder(item)).join('')}
    </ul>`
}

const Product = function (props) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${props.productName}<span>${props.productPrice}</span><span>${props.productQuantity}</span><span>${props.buttonSelect}</span>
    </li>`
}

const ProductList = function (props) {
  return `
    <ul class="list-group list-group-flush" id="account-holders-list">
      ${props.list.map((item) => Product(item)).join('')}
    </ul>`
}

const OptionAccount = function (props) {
  return `
    <option value="${props.id}">
      ${props.name}
    </option>`
}

const AccountSelect = function (props) {
  return `
    <select
        id="${props.name}"
        name="${props.name}"
        class="form-select" 
        onchange="handleOnChange(event)"
        aria-label="Default select example">
        <option selected>${props.default}</option>
        ${props.list.map((item) => OptionAccount(item)).join('')}
    </select>`
}
const HistoryItem = function (props) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">${props.timestamp.toLocaleString()} - ${
    props.message
  }</li>`
}
const HistoryList = function (props) {
  return `
    <ul class="list-group list-group-flush" id="history-list">
        ${props.list.map((item) => HistoryItem(item)).join('')}
    </ul>`
}
