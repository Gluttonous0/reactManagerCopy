/**
 * zustand临时缓存
 */
import { User } from "@/types/api";
import { create } from "zustand";

const useBearStore = create<{
  userInfo: User.UserItem;
  updateUserInfo: (userInfo: User.UserItem) => void;
}>(set => ({
  userInfo: {
    id: "",
    userId: 0,
    stateName: "",
    deptName: "",
    createTime: "",
    lastLoginTime: "",
    userName: "",
    userEmail: "",
    mobile: 0,
    job: "",
    state: 0,
    roleList: [],
    deptId: [],
    userImg: ""
  },
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo })
}));

export default useBearStore;
