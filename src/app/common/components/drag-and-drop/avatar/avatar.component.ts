import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { CommonImagesService } from "src/app/common/services/images.service"
import { User } from "src/app/features/users/users.interface"
import { CommonImageDragAndDrop } from "../image/image-dad.component"

@Component({
  selector: "common-avatar-drag-and-drop[user]",
  styleUrls: ["./avatar.component.scss"],
  template: `
    <common-image-drag-and-drop
      #dragAndDrop
      class="avatar-drag-and-drop"
      [maxImages]="1"
      maxFileSize="10MB"
      dropLabel="Select avatar"
      [initialFiles]="getArrayRepresentationOfImage()"
    ></common-image-drag-and-drop>
  `
})
export class CommonAvatarDragAndDropComponent implements OnInit {
  @ViewChild("dragAndDrop")
  dragAndDrop!: CommonImageDragAndDrop

  constructor(private imagesService: CommonImagesService) {}

  avatarSnapshot: Blob | undefined

  @Input()
  user!: User

  async ngOnInit() {
    const avatarUrl = this.user.avatarUrl
    if (avatarUrl) {
      this.avatarSnapshot = await this.imagesService.makeImageSnapshot(avatarUrl)
    }
  }

  getArrayRepresentationOfImage(): Blob[] {
    if (this.avatarSnapshot) {
      return [this.avatarSnapshot]
    }
    return []
  }

  isImageDeleted(): boolean {
    const hasNoInitialImage = !this.avatarSnapshot
    if (hasNoInitialImage) {
      return false
    }

    const currentImage = this.getCurrentImage()
    const hasNoCurrentImage = !currentImage

    return hasNoCurrentImage
  }

  hasNewImage(): boolean {
    const currentImage = this.getCurrentImage()
    const initialImage = this.avatarSnapshot
    const hasNoCurrentImage = !currentImage
    const hasNoInitialImage = !initialImage

    if (hasNoCurrentImage) {
      return false
    }

    if (hasNoInitialImage) {
      return true
    }

    const isImagesSame = this.imagesService.isBlobsSameFast(initialImage, currentImage)
    return isImagesSame === false
  }

  getCurrentImage(): Blob | undefined {
    return this.dragAndDrop.getFiles()[0]
  }

  hasInitialImage(): boolean {
    return !!this.avatarSnapshot
  }
}
