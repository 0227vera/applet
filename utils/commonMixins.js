module.exports = {
  updateValue (e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    let value = ''
    if (e.type === 'change') {
      value = e.detail
    } else if (e.type === 'input') {
      value = e.detail && e.detail.value
    }
    nameMap[name] = value
    this.setData(nameMap)
  }

}