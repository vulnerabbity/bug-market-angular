import { Injectable } from "@angular/core"

@Injectable()
export class FilesService {
  getPublicFileFullPath(publicFilesId: string) {
    return "http://localhost:3000/public-files/" + publicFilesId
  }

  addPathToPublicFiles(publicFilesIds: string[]) {
    return publicFilesIds.map(fileId => this.getPublicFileFullPath(fileId))
  }
}
