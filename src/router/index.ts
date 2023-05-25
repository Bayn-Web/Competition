import { createRouter, createWebHashHistory, RouteRecordRaw, useRouter } from "vue-router"
const routes: RouteRecordRaw[] = [
    {
        path: '/', component: ()=>import("../pages/index.vue"), children: [{
            path: '/about',
            component: import("../pages/about.vue"),
        }, {
            path: '/market',
            component: import("../pages/market.vue")
        },{
            path: '/market/dailyBest',
            component: import("../pages/dailyBest.vue")
        }, {
            path: '/market/details/:id',
            component: import("../pages/details.vue")
        }, {
            path: '/market/editDetails/:id',
            component: import("../pages/editDetails.vue")
        }, {
            path: '/userPage/upLoad',
            component: import("../pages/upload.vue")
        },
        {
            path: '/userPage',
            component: import("../pages/user.vue"),
            children: [{
                path: "/userPage/arts",
                component: import("../pages/arts.vue")
            }, {
                path: "/userPage/favorite",
                component: import("../pages/favorite.vue")
            }, {
                path: "/userPage/editinfo",
                component: import("../pages/editinfo.vue")
            }, {
                path: "/userPage/info",
                component: import("../pages/info.vue")
            }, {
                path: "/userPage/shoppingcar",
                component: import("../pages/shoppingcar.vue")
            }]
        }]
    },
    { path: '/login', component: ()=>import("../pages/login.vue") },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    let code = localStorage.getItem("token")
    if (to.fullPath != "/login" && !code) {
        next({ path: "/login" })
    }
    next()
})

export { router }