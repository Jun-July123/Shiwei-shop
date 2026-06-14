// 32-2.4.1 封装用户登录及个人信息的通用类型
type BaseProfile = {
  id: number /** 用户ID */
  avatar: string /** 头像 */
  account: string /** 账户名 */
  nickname?: string /** 昵称 */
}

/** 32-3.1 创建types/member.d.ts定义登录用户信息类型 */
// 32-2.4.2 &将通用类型合并到登录用户信息类型
export type LoginResult = BaseProfile & {
  mobile: string /** 手机号 */
  token: string /** 登录凭证 */
}

/** 35-2.4 定义用户个人信息类型 */
// 35-2.4.2 将通用类型合并到个人信息类型
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'
