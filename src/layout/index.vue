<template>
  <el-container>
    <div class="headerModule">
      <el-header height="61" class="user-header wrap main">
        <a href="/" class="logo">
          <img src="@/assets/logo.png" alt="logo" style="height: 50px">
        </a>
        <el-menu class="el-menu-title" mode="horizontal" :default-active="defaultUrl" :router="true">
          <el-menu-item index="/">
            首页
          </el-menu-item>
          <el-menu-item index="/question/index">
            问答
          </el-menu-item>
          <el-menu-item index="/tutor">
            导师推荐
          </el-menu-item>
          <el-menu-item index="/help">
            帮助中心
          </el-menu-item>
        </el-menu>
        <div class="head-search">
          <el-form>
            <el-form-item>
              <el-input placeholder="搜索" />
            </el-form-item>
          </el-form>
        </div>
        <div class="head-user" :hidden="isLogin">
          <a class="a-button">注册</a>
          <a href="/#/login" class="a-button">登录</a>
        </div>
        <div class="head-user" :hidden="!isLogin">
          <el-dropdown trigger="click" placement="bottom">
            <el-avatar class="el-dropdown-avatar" size="medium" :src="userInfo.avatar === null ? require('@/assets/avatar.png') : userInfo.avatar" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>个人中心</el-dropdown-item>
              <el-dropdown-item divided>我的话题</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    </div>
    <el-main class="iContainer">
      <router-view />
    </el-main>
    <el-footer height="340" class="app-footer">
      <div class="foot-container" />
    </el-footer>
    <div class="foot-copyright">
      <span ref="#" target="_blank">联系我们</span>
    </div>
  </el-container>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  data() {
    return {
      defaultUrl: '/',
      keyWords: null,
      isLogin: false,
      userInfo: {
        avatar: null
      }
    }
  },
  watch: {
    $route(to, from) {
      this.defaultUrl = this.routeSelect(to.path)
    }
  },
  created() {
    if (this.$store.getters.token !== undefined) {
      this.$store.dispatch('user/getInfo').then(() => {
        console.log('获取用户信息成功')
        this.userInfo.avatar = this.$store.getters.avatar
        this.isLogin = true
      })
    } else {
      console.log('尚未登录')
    }
  },
  methods: {
    routeSelect(path) {
      const topPath = ['/', '/index', '/paper/index', '/record/index', '/question/index']
      if (topPath.indexOf(path)) {
        return path
      }
      return null
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.isLogin = false
      this.$router.push('/')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #f4f5f7;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .main {
    margin: 0px auto 100px;
  }
  .wrap {
    width: 1210px;
  }
  .dash {
    width: 100%;
    background: #f3f4f6;
  }
  .iContainer {
    width: 100%;
    min-height: 100%;
    height: auto;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    box-pack: center;
    -ms-flex-pack: center;
    background: #f4f5f7;
  }
  .footer {
    min-width: 990px;
    background: #F2F3F5;
    height: 90px;
    margin-top: -90px;
    .message {
      width: 990px;
      margin: 0 auto;
      height: 18px;
      font-size: 0;
      line-height: 0;
      text-align: center;
    }
    .copyright {
      width: 990px;
      color: #86909C;
      text-align: center;
      margin: 18px auto 0;
    }
  }
</style>
