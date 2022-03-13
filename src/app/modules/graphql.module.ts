import { HttpClientModule } from "@angular/common/http"
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular"
import { HttpLink } from "apollo-angular/http"
import { InMemoryCache } from "@apollo/client/core"
import { NgModule, Provider } from "@angular/core"

const apolloOptionsProvider: Provider = {
  provide: APOLLO_OPTIONS,
  useFactory: (httpLink: HttpLink) => {
    return {
      cache: new InMemoryCache(),
      link: httpLink.create({
        // TODO: get from env
        uri: "http://localhost:3000/graphql"
      })
    }
  },
  deps: [HttpLink]
}

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  providers: [apolloOptionsProvider]
})
export class GraphqlModule {}
