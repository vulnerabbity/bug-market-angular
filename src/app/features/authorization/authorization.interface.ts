import { Ability, InferSubjects } from "@casl/ability"
import { Product } from "../products/products.interface"

export type UserRole = "seller" | "admin" | "super admin"

export type AppAbilityAction = "manage" | "create" | "read" | "update" | "delete"

export class ItemWithUserId {
  userId!: string
}

export type AppAbilitySubject = InferSubjects<typeof Product> | "all"

export type AppAbility = Ability<[AppAbilityAction, AppAbilitySubject]>

export interface AbilityUser {
  userId: string
  roles: UserRole[]
}
