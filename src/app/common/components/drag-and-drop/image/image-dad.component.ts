import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { FilePond, FilePondOptions } from "filepond"

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

  @ViewChild("pondRef")
  protected pond!: FilePond

  readonly filePondConfig: FilePondOptions = {
    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
    maxFiles: this.maxImages,
    allowMultiple: true,

    allowImagePreview: true,
    imagePreviewHeight: 300,
    stylePanelLayout: "compact",

    labelIdle: this.dropLabel
  }

  constructor() {}

  getFiles() {
    const files = this.pond.getFiles()

    return files
  }
}
