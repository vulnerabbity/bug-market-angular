import { NgModule } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule } from "@angular/material/dialog"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
]

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}
