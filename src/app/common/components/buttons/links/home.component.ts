import { Component } from "@angular/core"

@Component({
  selector: "common-home-link",
  template: `
    <common-link class="small-home" label="home" link="/" matIconName="bug_report"></common-link>
    <common-link
      class="large-home"
      text="Bug market"
      label="home"
      link="/"
      matIconName="bug_report"
    ></common-link>
    <style>
      @media (max-width: 30rem) {
        .large-home {
          display: none;
        }
      }
      @media (min-width: 30rem) {
        .small-home {
          display: none;
        }
      }
    </style>
  `
})
export class CommonHomeLinkComponent {}
