<template>
  <div class="main wrap">
    <div class="tabModule">
      <div class="tab-box">
        <div style="max-height: none;">
          <a class="tab-current">全部</a>
          <a class="tab">导师</a>
        </div>
      </div>
    </div>
    <div class="topicModule">
      <div class="topic-box">
        <div class="topicList">
          <div v-for="item in list" :key="item.id" class="topicItem">
            <div class="avatarBox">
              <a class="avatarLink">
                <img :src="item.avatar" alt="头像">
              </a>
            </div>
            <div class="content clearfix">
              <ul class="info">
                <li>
                  <span class="tag-container">
                    <span class="tag">
                      {{ item.section }}
                    </span>
                  </span>
                  <span class="postTime">发表时间：{{ item.createTime|formatDateTime }}</span>
                </li>
              </ul>
              <h2 class="title clearfix">
                <a :href="'/#/topic/detail?id='+item.id">{{ item.title }}</a>
              </h2>
              <div class="clearfix" />
              <div class="detail">
                <h2 class="summary" v-html="item.content" />
              </div>
            </div>
            <div class="statistic clearfix">
              <div class="viewTotal">
                <i class="icon">
                  <img src="@/assets/eye.png" style="height: 14px; width: 14px">
                </i>
                {{ item.readCount }}
              </div>
              <div class="commentTotal">
                <i class="icon">
                  <img src="@/assets/message.png" style="height: 14px; width: 14px">
                </i>
                {{ item.replyCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination v-show="total>0" :total="total" :page.sync="queryParam.page" :limit.sync="queryParam.limit" style="text-align: right;padding-top: 5px; padding-bottom: 5px; margin-top: 10px" @pagination="getList" />
    </div>
    <div class="topic-formModule">
      <div class="addTopic-wrap">
        <el-form v-model="form">
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item>
            <tinymce v-model="form.content" />
          </el-form-item>
          <el-form-item>
            <el-button @click="handleEdit">发表</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
import { editTopic, getTopicList } from '@/api/topic'
import { formatDate } from '@/utils'

export default {
  name: 'Dashboard',
  components: { Pagination, Tinymce },
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
      queryParam: {
        page: 1,
        limit: 15,
        sectionId: 1
      },
      list: [],
      total: 0,
      form: {
        sectionId: 1,
        title: null,
        content: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getTopicList(this.queryParam).then(re => {
        this.list = re.data.list
        this.total = re.data.total
      })
    },
    handleEdit() {
      editTopic(this.form).then(re => {
        console.log(re.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .tabModule {
    margin-top: 50px;
    padding: 4px 18px 4px 18px;
    font-size: 14px;
    line-height: 300%;
    text-align: left;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0px 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
    .tab-box {
      margin-right: 90px;
    }
  }
  .tab-current{
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    padding: 7px 10px 7px 10px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: #1D2129;
    color: #fff;
    position: relative;
  }
  .tab  {
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    padding: 8px 10px 8px 10px;
    margin-right: 5px;
    border-radius: 3px;
    color: #4E5969;
    background-color: #f2f3f5;
    position: relative;
  }

  .topic-formModule {
    margin-top: 10px;
    .addTopic-wrap {
      position: relative;
      background: #fff;
      padding: 15px 18px 5px 15px;
      box-shadow: 0 0px 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
    }
  }
</style>
