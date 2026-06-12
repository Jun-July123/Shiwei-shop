/** 32-3.1 创建types/member.d.ts定义登录用户信息类型 */
export type LoginResult = {
  id: number /** 用户ID */
  avatar: string /** 头像 */
  account: string /** 账户名 */
  nickname?: string /** 昵称 */
  mobile: string /** 手机号 */
  token: string /** 登录凭证 */
}
