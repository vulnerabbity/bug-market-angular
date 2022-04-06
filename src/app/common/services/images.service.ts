import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class CommonImagesService {
  async makeImageSnapshot(url: string): Promise<Blob> {
    const response = await fetch(url)
    const blobFromResponse = await response.blob()
    return blobFromResponse
  }

  async makeImagesSnapshot(urls: string[]): Promise<Blob[]> {
    const result: Blob[] = []
    for (const url of urls) {
      const image = await this.makeImageSnapshot(url)
      result.push(image)
    }
    return result
  }

  /**
   * Compares two blobs by size
   */
  isBlobsSameFast(oldBlob: Blob, newBlob: Blob): boolean {
    return oldBlob.size == newBlob.size
  }
}
