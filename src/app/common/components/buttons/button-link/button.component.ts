import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core"
import { BaseButtonLinkComponent } from "./base-button-link.component"

@Component({
  selector: "common-button",
  styleUrls: ["./button-link.component.scss"],
  template: `
    <button
      class="button-link"
      [class.disabled]="disabled"
      [disabled]="disabled"
      [ngClass]="this.getMaterialClass()"
      matTooltipClass="tooltip"
      [matTooltip]="tooltip"
      [attr.aria-label]="this.label"
      (click)="onClick.emit()"
    >
      <span class="text-before" *ngIf="text && iconPosition === 'after'">{{ text }}</span>
      <mat-icon class="icon" [ngClass]="{ 'icon--big': iconSize === 'big' }" *ngIf="matIconName">
        {{ matIconName }}
      </mat-icon>
      <span class="text-after" *ngIf="text && iconPosition === 'before'">{{ text }}</span>
    </button>
    <style>
      .button-link {
        border: unset;
      }
    </style>
  `
})
export class CommonButtonComponent extends BaseButtonLinkComponent {
  @Output()
  onClick = new EventEmitter()
}
