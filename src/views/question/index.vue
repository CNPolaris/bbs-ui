<template>
  <div class="main wrap">
    <div class="questionTabModule">
      <div class="questionTab-box">
        <div style="max-height: none;">
          <a class="tab-current">全部</a>
          <a v-for="item in sections" :key="item.id" class="tab">
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-button @click="$router.push('/question/edit')">提问</el-button>
    </div>
    <div class="askListModule">
      <ul class="nav clearfix" />
      <div class="question-box">
        <div class="questionList">
          <el-tabs @tab-click="handleClick">
            <el-tab-pane label="全部">
              <div v-for="item in list" :key="item.id" class="questionItem">
                <div class="avatarBox">
                  <a class="avatarLink">
                    <img :src="item.avatar" alt="头像">
                  </a>
                </div>
                <div class="content clearfix">
                  <ul class="info">
                    <li>
                      <a class="userName">
                        {{ item.nickName }}
                      </a>
                      <span class="postTime">
                        发表时间：{{ item.createTime|formatDateTime }}
                      </span>
                      <span class="statistic">
                        回答： {{ item.answerCount }}
                      </span>
                      <span class="statistic">
                        浏览：{{ item.readCount }}
                      </span>
                    </li>
                  </ul>
                  <h2 class="title clearfix">
                    <a target="_blank" :href="'/#/question/detail/?id='+ item.id" >
                      {{ item.title }}
                    </a>
                  </h2>
                  <div class="clearfix" />
                  <!--                  <h2 class="summary">-->
                  <!--                    {{ item.content }}-->
                  <!--                  </h2>-->
                </div>
              </div>
              <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" style="text-align: right;padding-top: 5px; padding-bottom: 5px; margin-top: 10px" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="已解决">
              <div v-for="item in list" :key="item.id" class="questionItem">
                <div class="avatarBox">
                  <a class="avatarLink">
                    <img :src="item.avatar" alt="头像">
                  </a>
                </div>
                <div class="content clearfix">
                  <ul class="info">
                    <li>
                      <a class="userName">
                        {{ item.nickName }}
                      </a>
                      <span class="postTime">
                        发表时间：{{ item.createTime|formatDateTime }}
                      </span>
                      <span class="statistic">
                        回答： {{ item.answerCount }}
                      </span>
                      <span class="statistic">
                        浏览：{{ item.readCount }}
                      </span>
                    </li>
                  </ul>
                  <h2 class="title clearfix">
                    <a>
                      {{ item.title }}
                    </a>
                  </h2>
                  <div class="clearfix" />
                  <!--                  <h2 class="summary">-->
                  <!--                    {{ item.content }}-->
                  <!--                  </h2>-->
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="未解决">
              <div v-for="item in list" :key="item.id" class="questionItem">
                <div class="avatarBox">
                  <a class="avatarLink">
                    <img :src="item.avatar" alt="头像">
                  </a>
                </div>
                <div class="content clearfix">
                  <ul class="info">
                    <li>
                      <a class="userName">
                        {{ item.nickName }}
                      </a>
                      <span class="postTime">
                        发表时间：{{ item.createTime|formatDateTime }}
                      </span>
                      <span class="statistic">
                        回答： {{ item.answerCount }}
                      </span>
                      <span class="statistic">
                        浏览：{{ item.readCount }}
                      </span>
                    </li>
                  </ul>
                  <h2 class="title clearfix">
                    <a>
                      {{ item.title }}
                    </a>
                  </h2>
                  <div class="clearfix" />
                  <!--                  <h2 class="summary">-->
                  <!--                    {{ item.content }}-->
                  <!--                  </h2>-->
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionList } from '@/api/question'
const { mapActions, mapGetters, mapState } = require('vuex')
import Pagination from '@/components/Pagination'
import { formatDate } from '@/utils'
export default {
  components: {
    Pagination
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      query: {
        page: 1,
        limit: 10,
        sectionId: null,
        title: null,
        status: null
      }
    }
  },
  computed: {
    ...mapGetters('section', ['sectionEnumFormat']),
    ...mapState('section', { sections: state => state.sections })
  },
  created() {
    this.initSection()
    this.getList()
  },
  methods: {
    getList() {
      const _this = this
      getQuestionList(this.query).then(re => {
        _this.list = re.data.list
        _this.total = re.data.total
      })
    },
    handleClick(tab, event) {
      switch (tab.index) {
        case '0':
          this.query.status = null
          break
        case '1':
          this.query.status = 0
          break
        case '2':
          this.query.status = 1
          break
        default:
          this.query.status = null
      }
      this.getList()
    },
    ...mapActions('section', { initSection: 'initSection' })
  }
}
</script>

<style lang="scss" scoped>
.questionTabModule {
  margin-top: 50px;
  padding: 8px 15px 8px 15px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
  .questionTab-box {
    margin-right: 90px;
  }
}

.askListModule {
  margin-top: 10px;
  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    .nav>li {
      position: relative;
      display: block;
      float: left;
      margin-bottom: -1px;
    }
  }
  .question-box {
    background: #fff;
    padding: 0 15px 0 15px;
    box-shadow: 0 0 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
    .questionList {
      .questionItem {
        margin: 0;
        border-bottom: 1px solid #F2F3F5;
        padding: 15px 0 10px 0;
        position: relative;
        min-height: 90px;
        .avatarBox {
          position: relative;
          margin-left: 0;
          margin-right: 10px;
          padding: 0;
          float: left;
          .avatarLink {
            display: block;
            position: relative;
            float: left;
            padding-left: 6px;
            img {
              float: none;
              display: block;
              width: 60px;
              height: 60px;
              margin-right: 10px;
              border-radius: 60px;
              position: relative;
            }
          }
        }
        .content {
          margin-left: 90px;
          margin-right: 160px;
          ul {
            list-style: none;
            margin: 0px;
            padding: 0px;
          }
          .info {
            margin-bottom: 8px;
            color: #C9CDD4;
            padding-left: 0;
            list-style: none;
            margin-left: -5px;
            font-size: 0;
            .statistic {
              font-size: 14px;
              display: inline-block;
              margin-left: 5px;
            }
            li {
              display: inline-block;
              padding-left: 5px;
              padding-right: 5px;
            }
            .userName {
              color: #86909c;
              font-size: 14px;
              display: inline-block;
              margin-right: 4px;
            }
            .postTime {
              margin-left: 10px;
              position: relative;
              top: 1px;
              font-size: 14px;
            }
            .lastAnswerTime {
              margin-left: 10px;
              position: relative;
              top: 1px;
              font-size: 13px;
            }
            .reward {
              display: inline-block;
              vertical-align: middle;
              background: #fcf3e6;
              border-radius: 2px;
              padding: 5px 8px;
              margin-left: 6px;
              position: relative;
              top: -5px;
              .gradientMask {
                animation-duration: 15s;
                animation-fill-mode: forwards;
                animation-iteration-count: infinite;
                animation-name: maskBackground;
                animation-timing-function: linear;
                background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 80%,rgba(255,255,255,0.3) 100%);
                transform: skewX(-30deg);
                font-size: 14px;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
              }
              .rewardInfo {
                color: #e2b46d;
                font-size: 14px;
                line-height: 14px;
              }
            }
          }
          .title {
            font-weight: 600;
            margin: 0 5px 0 0;
            font-size: 18px;
            line-height: 28px;
             a {
              color: #272E3B;
            }
            .questionTag {
              display: inline-block;
              font-size: 14px;
              line-height: 14px;
              padding: 3px 6px 3px 6px;
              margin-right: 5px;
              border-radius: 3px;
              color: #20a0ff;
              background-color: #E8F3FF;
              position: relative;
              font-weight: 100;
              top: -1px;
            }
            .summary {
              margin: 3px 5px 0 0;
              font-size: 15px;
              line-height: 28px;
              font-weight: normal;
              text-decoration: none;
              color: #86909C;
            }
          }
        }
        .rank {
          position: absolute;
          top: 30px;
          right: 0;
          font-size: 16px;
          text-align: center;
          line-height: 16px;
          .solve {
            background: #20a0ff;
            border: none;
            color: #fff;
          }
          small {
            display: block;
            font-size: 12px;
            margin-top: 1px;
          }
          .answers {
            color: #20a0ff;
            background: #E8F3FF;
            border: none;
          }
          .views {
            background-color: #F2F3F5;
            border-color: #F2F3F5;
            color: #86909C;
          }
        }
      }
    }
    .questionPage {
      padding-top: 20px;
      background: #fff;
      height: 54px;
      overflow: hidden;
    }
  }
}
.pg {
  float: right;
  line-height: 36px;
  font-size: 14px;
}
</style>
