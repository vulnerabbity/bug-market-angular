import { NgModule } from "@angular/core"
import { FilePondModule, registerPlugin } from "ngx-filepond"

// filepond plugins
import * as FP_FileValidateType from "filepond-plugin-file-validate-type"
import * as FP_ImagePreview from "filepond-plugin-image-preview"

registerPlugin(FP_FileValidateType)
registerPlugin(FP_ImagePreview)

@NgModule({
  imports: [FilePondModule],
  exports: [FilePondModule]
})
export class AppFilepondModule {}
