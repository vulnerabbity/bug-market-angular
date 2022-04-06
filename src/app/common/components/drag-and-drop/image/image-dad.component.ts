import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core"
import { FilePond, FilePondFile, FilePondOptions } from "filepond"

@Component({
  selector: "common-image-drag-and-drop",
  templateUrl: "./image-dad.component.html",
  styleUrls: ["./image-dad.component.scss"]
})
export class CommonImageDragAndDrop {
  @Input()
  maxImages = 10

  @Input()
  dropLabel = "Drop images here. Or click to select"

  @Input()
  maxFileSize: string | null = null

  @Input()
  initialFiles: FilePondOptions["files"] = []

  @ViewChild("pondRef")
  protected pond!: FilePond

  getFiles(): Blob[] {
    const files = this.pond.getFiles().map(file => file.file)

    return files
  }

  getFilePondFiles(): FilePondFile[] {
    return this.pond.getFiles()
  }

  // should be getter otherwise input values will not be applied
  getFilepondConfig(): FilePondOptions {
    return {
      acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg", "image/webp"],

      // set files limits
      maxFiles: this.maxImages,
      allowMultiple: true,
      maxFileSize: this.maxFileSize,

      // style
      imagePreviewHeight: 300,
      allowImagePreview: true,
      labelIdle: this.dropLabel
    }
  }
}
