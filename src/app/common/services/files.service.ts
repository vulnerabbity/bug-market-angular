import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"

@Injectable()
export class FilesService {
  getPublicFileFullPath(publicFilesId: string) {
    return `${environment.publicFilesUrl}/${publicFilesId}`
  }

  addPathToPublicFiles(publicFilesIds: string[]) {
    return publicFilesIds.map(fileId => this.getPublicFileFullPath(fileId))
  }
}
