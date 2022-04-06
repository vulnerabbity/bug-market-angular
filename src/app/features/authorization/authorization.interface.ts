import { Ability, InferSubjects } from "@casl/ability"
import { Product } from "../products/products.interface"
import { User } from "../users/users.interface"

export type UserRole = "seller" | "admin" | "super admin"

export type AppAbilityAction = "manage" | "create" | "read" | "update" | "delete"

export class ItemWithUserId {
  userId!: string
}

export type Subject = typeof Product | typeof User
export type AppAbilitySubject = InferSubjects<Subject> | "all"

export type AppAbility = Ability<[AppAbilityAction, AppAbilitySubject]>

export interface AbilityUser {
  userId: string
  roles: UserRole[]
}
