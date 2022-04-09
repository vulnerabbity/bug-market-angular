import { Injectable } from "@angular/core"
import { ApolloQueryResult } from "@apollo/client/core"
import { HttpResponse, HttpStatuses } from "../interfaces/responses.interface"
import { StatusCodes } from "../interfaces/status-codes.interface"

@Injectable({ providedIn: "root" })
export class GraphqlParserService {
  parse<T>(response: ApolloQueryResult<any>): HttpResponse<T> {
    const data = response.data
    if (data) {
      const queryName = Object.keys(data)[0]

      return { data: data[queryName], status: HttpStatuses.Success }
    }

    const statusCode = this.parseStatusCode(response)

    if (statusCode === StatusCodes.NotFound) {
      return { status: HttpStatuses.NotFound }
    }

    return { status: HttpStatuses.UnknownError }
  }

  private parseStatusCode(response: ApolloQueryResult<any>): number | null {
    const error = response?.errors?.[0]
    const errorDetails = error?.extensions
    const statusCode = errorDetails?.["code"]
    if (!statusCode) {
      return null
    }
    return Number(statusCode)
  }
}
