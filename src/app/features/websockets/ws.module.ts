import { NgModule } from "@angular/core"
import { WebsocketsService } from "./ws.service"

@NgModule({ providers: [WebsocketsService] })
export class WebsocketsModule {}
