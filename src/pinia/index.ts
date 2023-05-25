import { defineStore } from 'pinia'
const usePinia = defineStore("pinia", {
    persist: true,
    state: () => {
        return {
            nowAt: 0,
            id: 1,
            userInfo: {
                address: '',
                age: '',
                createTime: '',
                id: 0,
                idCard: "0",
                isDeleted: 0,
                lastLoginIp: '',
                lastLoginTime: '',
                mobile: '',
                realName: '',
                token: '',
                userAccount: '',
                userPassword: '',
                userSex: '男',
                userStatus: ''
            },
        }
    }
}
)
export default usePinia