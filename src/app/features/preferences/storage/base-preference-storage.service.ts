import { LocalStorageService } from "../../local-storage/local-storage.service"

export class BasePreferenceLocalStorageService<T> extends LocalStorageService<T> {
  constructor(recordName: string, private readonly initialValue?: T) {
    super(recordName)
    this.initializeIfNeed()
  }
  private initializeIfNeed() {
    const initialValue = this.initialValue

    const recordNotExist = this.isRecordExists() === false
    const hasInitialValue = initialValue !== undefined
    const needInitialize = recordNotExist && hasInitialValue

    if (needInitialize) {
      this.initialize(initialValue)
    }
  }

  private initialize(initialValue: T) {
    this.saveRecord(initialValue)
  }
}
