import { Component, Input } from "@angular/core"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "common-github-link",
  styleUrls: ["./github.component.scss"],
  template: `
    <img class="github-image" [src]="imageUrl" alt="github logo" />
    <p *ngIf="text" class="text">{{ text }}</p>
  `
})
export class CommonGithubLinkComponent {
  @Input()
  text: string = ""

  imageUrl = assetsPaths.Github
}
