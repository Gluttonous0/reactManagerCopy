import { Dept, User } from "./api"

export type IAction = "create" | "edit" | "delete"
export type DataFromChild = string | number | object[]
export interface ImodalProp<T = User.UserItem> {
  mRef: React.MutableRefObject<{ open: (type: IAction, data?: T) => void } | undefined>
  update: () => void
}

export interface ImodalRoleProp<T = User.UserItem> {
  mRef: React.MutableRefObject<{ open: (data?: T) => void } | undefined>
  update: () => void
}
