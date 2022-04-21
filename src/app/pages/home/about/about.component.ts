import { Component } from "@angular/core"

interface Technology {
  name: string
  link?: string
}

@Component({
  selector: "homepage__about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class HomepageAboutComponent {
  typescriptTech: Technology = { name: "Typescript", link: "https://www.typescriptlang.org/" }
  rxjsTech: Technology = { name: "RxJS", link: "https://rxjs.dev/" }
  gqlTech: Technology = { name: "Graphql", link: "https://graphql.org" }
  websocketsTech: Technology = { name: "Socket.Io", link: "https://socket.io/" }
  jwtTech: Technology = { name: "Jwt", link: "https://jwt.io/" }

  frontEndTechs: Technology[] = [
    { name: "Angular", link: "https://angular.io/" },
    this.typescriptTech,
    this.websocketsTech,
    this.rxjsTech,
    this.gqlTech,
    { name: "Fuse.js", link: "https://fusejs.io/" },
    { name: "Casl.js", link: "https://casl.js.org/v5/en/" },
    this.jwtTech,
    // ui
    { name: "Angular Material", link: "https://material.angular.io/" },
    { name: "SCSS", link: "https://material.angular.io/" },
    { name: "Filepond", link: "https://pqina.nl/filepond/" }
  ]

  backendTechs: Technology[] = [
    { name: "Nest.js", link: "https://nestjs.com/" },
    { name: "Node.js", link: "https://nodejs.org" },
    { name: "Express", link: "https://expressjs.com/" },
    { name: "Mongodb", link: "https://mongodb.com" },
    { name: "Mongoose", link: "https://mongoosejs.com/" },
    this.typescriptTech,
    this.rxjsTech,
    this.gqlTech,
    this.websocketsTech,
    this.jwtTech,
    { name: "Sharp", link: "https://www.npmjs.com/package/sharp" },
    { name: "Passport", link: "https://www.passportjs.org/" }
  ]
}
