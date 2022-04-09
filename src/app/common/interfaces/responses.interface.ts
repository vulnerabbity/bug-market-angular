export enum HttpStatuses {
  Success = "success",
  NotFound = "not-found",
  UnknownError = "unknown-error"
}

// to union type
export type HttpStatus = `${HttpStatuses}`

export interface HttpResponse<T = {}> {
  data?: T
  status: HttpStatus
}
