import Vue from "vue";
import Router from "vue-router";
import config from "../ppSwallow/config";

// 静态路由
import Layout from "../views/layout";

Vue.use(Router);

export const constantRoutes = [
    {
        path: "/login",
        component: () => import("../views/login/index"),
        hidden: true
    },

    {
        path: "/404",
        component: () => import("../views/404"),
        hidden: true

    },
    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
    new Router({
        // mode: 'history', //后端支持可开
        mode: config.routerMode,
        routes: constantRoutes
    });
const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;

export const asyncRouterMap = [
    {
        path: "/userManage",
        meta: {
            authRule: ["user_manage"]
        },
        children: [
            /*  {
                path: "authAdmin",
                component: authAdmin,
                name: "管理员管理",
                icon: "0",
                meta: {
                    authRule: ["admin/auth_admin/index"]
                }
            },
            {
                path: "authRole",
                component: authRole,
                name: "角色管理",
                icon: "0",
                meta: {
                    authRule: ["admin/auth_role/index"]
                }
            },
            {
                path: "authPermissionRule",
                component: authPermissionRule,
                name: "权限管理",
                icon: "0",
                meta: {
                    authRule: ["admin/auth_permission_rule/index"]
                }
            }*/
        ]
    }
];
