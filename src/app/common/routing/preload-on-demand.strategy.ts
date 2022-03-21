import { PreloadingStrategy, Route } from "@angular/router"
import { Observable, of } from "rxjs"

export class PreloadModuleOnDemand implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const preloadingDemanded = route?.data?.["preload"] === true
    if (preloadingDemanded) {
      return load()
    }
    return of(null)
  }
}
