import { NgModule } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

const materialModules = [MatButtonModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule]

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
