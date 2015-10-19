"use strict"

// Device types
const DEVICE_TYPE_BEAN = 'DEVICE_TYPE_BEAN'
const DEVICE_TYPE_BLE = 'DEVICE_TYPE_BLE'
const DEVICE_TYPE_BEAN_PLUS = 'DEVICE_TYPE_BEAN_PLUS'

const BEAN_UUID = 'a495ff10c5b14b44b5121370f02d74de'


function fromPeripheral(peripheral) {
  var adv = peripheral.advertisement
  var name = adv.localName ? adv.localName : ''
  if (adv.serviceUuids.indexOf(BEAN_UUID) == -1) {
    return new BleDevice(peripheral.uuid, name, adv.serviceUuids)
  } else {
    return new LightBlueDevice(peripheral.uuid, name, adv.serviceUuids)
  }
}


class BleDevice {

  constructor(uuid, name, services) {
    this._uuid = uuid
    this._name = name
    this._services = services
  }

  get_type() {
    return DEVICE_TYPE_BLE
  }

  toString() {
    var out = `BLE Device:\n`
    out += `    Name: ${this._name}\n`
    out += `    UUID: ${this._uuid}\n`
    out += `    Services:\n`
    for (var i in this._services) {
      out += `        ${this._services[i]}`
    }
    out += '\n'
    return out
  }

  serialize() {
    return {
      name: this._name,
      uuid: this._uuid,
      device_type: this.get_type()
    }
  }
}

class LightBlueDevice extends BleDevice {
  constructor(uuid, name, services) {
    super(uuid, name, services)
  }

  get_type() {
    return DEVICE_TYPE_BEAN
  }

  toString() {
    var out = `LightBlue Device:\n`
    out += `    Name: ${this._name}\n`
    out += `    UUID: ${this._uuid}\n`
    out += `    Services:\n`
    for (var i in this._services) {
      out += `        ${this._services[i]}`
    }
    out += '\n'
    return out
  }
}

module.exports = {
  fromPeripheral: fromPeripheral,
  BleDevice: BleDevice,
  LightBlueDevice: LightBlueDevice,
  DEVICE_TYPE_BEAN: DEVICE_TYPE_BEAN,
  consts: {
    DEVICE_TYPE_BEAN: DEVICE_TYPE_BEAN,
    DEVICE_TYPE_BLE: DEVICE_TYPE_BLE
  }
}