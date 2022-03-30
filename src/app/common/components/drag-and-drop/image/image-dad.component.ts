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

  @Input()
  maxFileSize: string | null = null

  @ViewChild("pondRef")
  protected pond!: FilePond

  readonly filePondConfig: FilePondOptions = {
    // hide wrong type message
    dropValidation: true,
    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg", "image/webp"],

    // set files limits
    maxFiles: this.maxImages,
    allowMultiple: true,
    maxFileSize: this.maxFileSize,

    // style
    stylePanelLayout: "compact",
    imagePreviewHeight: 300,
    allowImagePreview: true,
    labelIdle: this.dropLabel
  }

  constructor() {}

  getFiles(): Blob[] {
    const files = this.pond.getFiles().map(file => file.file)

    return files
  }
}
