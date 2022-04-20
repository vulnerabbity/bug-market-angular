import { Component, Input, OnInit } from "@angular/core"
import { Product } from "src/app/features/products/products.interface"
import { User } from "src/app/features/users/users.interface"
import { userDefaults } from "src/app/features/users/user.defaults"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { ConcreteChatCreatorService } from "src/app/features/chat/chats/concrete/concrete-chat-creator.service"
import { AppRouterService } from "src/app/common/services/router.service"

@Component({
  selector: "concrete-product-page-author[product]",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"]
})
export class ConcreteProductPageAuthorComponent implements OnInit {
  @Input()
  product!: Product

  author!: User

  private currentUserId: User["id"] | null = null

  constructor(
    private usersLoader: UsersLoaderService,
    private userState: CurrentUserState,
    private chatCreator: ConcreteChatCreatorService,
    private appRouter: AppRouterService
  ) {}

  async ngOnInit() {
    this.author = await this.loadUser(this.product.userId)
    this.currentUserId = this.userState.getUserIdOrNull()
  }

  canWriteMessage() {
    const hasCurrentUser = !!this.currentUserId
    const notOwn = this.isOwn() === false
    return notOwn && hasCurrentUser
  }

  getUserName() {
    if (this.isOwn()) {
      return "You"
    }

    if (this.author.name) {
      return this.author.name
    }

    return userDefaults.name
  }

  async onWriteMessage() {
    const { data: chatCandidate } = await this.chatCreator.initIfNotExistsResponse(this.author.id)
    console.log(chatCandidate)

    if (chatCandidate) {
      this.appRouter.redirectToConcreteChat(chatCandidate.id)
    }
  }

  private isOwn() {
    return this.author.id === this.currentUserId
  }

  private async loadUser(id: string): Promise<User> {
    return await this.usersLoader.loadUserOrRedirect({ id })
  }
}
