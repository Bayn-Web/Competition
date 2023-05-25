import { ElNotification } from "element-plus"
import { Router } from "vue-router"
type elType = "" | "success" | "warning" | "info" | "error"
export function elNote(message: string, type: elType = "success", title: string = "") {
    ElNotification({
        title,
        message,
        type,
    })
}
export function goto(path: string, router: Router) {
    router.push({ path })
}