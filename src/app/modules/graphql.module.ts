import { HttpClientModule } from "@angular/common/http"
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular"
import { HttpLink } from "apollo-angular/http"
import { InMemoryCache } from "@apollo/client/core"
import { NgModule, Provider } from "@angular/core"
import { environment } from "src/environments/environment"

const apolloOptionsProvider: Provider = {
  provide: APOLLO_OPTIONS,
  useFactory: (httpLink: HttpLink) => {
    return {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: environment.graphqlBackendUrl
      }),

      // disabling caching
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore"
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all"
        }
      }
    }
  },
  deps: [HttpLink]
}

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  providers: [apolloOptionsProvider]
})
export class GraphqlModule {}
