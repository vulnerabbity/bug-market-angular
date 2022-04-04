export class LocalStorageService<T> {
  private keyName: string

  constructor(keyName: string) {
    this.keyName = keyName
  }

  saveRecord(objectToSave: T) {
    const objectToSaveJson = this.toJson(objectToSave)
    localStorage.setItem(this.keyName, objectToSaveJson)
  }

  tryToGetRecord(): T {
    if (this.isRecordExists() === false) {
      throw new Error(`Record with key ${this.keyName} does not exists`)
    }
    const recordStringRepresentation = localStorage.getItem(this.keyName)!
    return this.parseJson(recordStringRepresentation)
  }

  isRecordExists(): boolean {
    const recordOrNull = localStorage.getItem(this.keyName)
    if (recordOrNull === null) {
      return false
    }
    return true
  }

  deleteRecord(): void {
    localStorage.removeItem(this.keyName)
  }

  protected toJson(value: any) {
    return JSON.stringify(value)
  }

  protected parseJson(jsonString: string) {
    return JSON.parse(jsonString)
  }
}
