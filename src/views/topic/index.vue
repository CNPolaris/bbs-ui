<template>
  <div class="topicContentModule">
    <div class="left">
      <div class="topic-wrap">
        <div class="topicTag">
          <a class="tag">{{ topic.section }}</a>
        </div>
        <div class="topicBox">
          <div class="title">
            {{ topic.title }}
          </div>
          <div class="topicInfo clearfix">
            <div class="postTime">
              {{ topic.createTime|formatDateTime }}
            </div>
            <div class="viewTotal-icon">
              <img src="@/assets/eye.png" style="width: 14px; height: 14px" alt="浏览">
            </div>
            <div class="viewTotal">
              {{ topic.readCount }}
            </div>
            <div class="comment-icon">
              <img src="@/assets/message.png" style="width: 14px; height: 14px" alt="评论">
            </div>
            <div class="comment">
              {{ topic.replyCount }}
            </div>
          </div>
          <div class="topicContent" v-html="topic.content" />
        </div>
      </div>
      <div class="commentModule">
        <ol class="commentList">
          <div v-for="item in oneCommentList" :key="item.id" class="commentInfo">
            <div class="comment-author">
              <a>
                <img :src="item.comment.avatar" alt="头像">
              </a>
              <a class="userName">
                {{ item.comment.nickName }}
              </a>
            </div>
            <div class="commentTime">
              {{ item.comment.createTime|formatDateTime }}
              <span style="margin-left: 5px">{{ item.comment.address }}</span>
            </div>

            <div class="commentContent">
              <span v-html="item.comment.content" />
            </div>
            <div class="clearfix" />
            <div class="replyList">
              <ul>
                <li v-for="two in item.replyList" :key="two.id">
                  <div class="reply-top">
                    <a class="avatarBox">
                      <img :src="two.avatar" alt="头像">
                    </a>
                    <a class="userName">
                      {{ two.nickName }}的评论
                    </a>
                    <span class="time">
                      {{ two.createTime|formatDateTime }}
                      <span style="margin-left: 5px">{{ two.address }}</span>
                    </span>
                  </div>
                  <div class="replyContent">
                    <span v-html="two.content" />
                  </div>
                </li>
              </ul>
            </div>
            <div class="tipBottom">
              <span class="a-toolbar">
                <a>
                  <i @click="handleReply(item.comment)">
                    回复
                  </i>
                </a>
              </span>
            </div>
          </div>
        </ol>
        <pagination v-show="oneCommentTotal>0" :total="oneCommentTotal" :page.sync="commentPage.page" :limit.sync="commentPage.limit" style="text-align: right" @pagination="getList" />
      </div>
      <el-dialog :visible.sync="replyVisible">
        <tinymce v-model="commentForm.content" />
        <div slot="footer" class="el-dialog__footer">
          <el-button @click="replyVisible=false">取消</el-button>
          <el-button type="primary" @click="submitForm">回复</el-button>
        </div>
      </el-dialog>
      <div class="comment-formModule">
        <div class="addComment-wrap">
          <tinymce v-model="comment.content" />
          <el-button type="primary" @click="handleComment">评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectTopic } from '@/api/topic'
import { createComment, selectCommentList } from '@/api/reply'
import Tinymce from '@/components/Tinymce'
import { formatDate } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
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
      replyVisible: false,
      topic: {
        id: null,
        nickName: null,
        section: null,
        replyCount: null,
        readCount: null,
        title: null,
        content: null,
        createTime: null
      },
      comment: {
        topicId: null,
        title: null,
        content: null
      },
      oneCommentList: [],
      oneCommentTotal: 0,
      commentPage: {
        page: 1,
        limit: 5,
        topicId: null,
        twoPage: 1,
        twoLimit: 3
      },
      commentForm: {
        topicId: null,
        parentCommentId: null,
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
      const id = this.$route.query.id
      const _this = this
      if (id && parseInt(id) !== 0) {
        selectTopic(id).then(re => {
          _this.topic = re.data
          _this.comment.topicId = id
          _this.comment.title = re.data.title
        })
        _this.commentPage.topicId = parseInt(id)
        selectCommentList(_this.commentPage).then(re => {
          _this.oneCommentList = re.data.list
          _this.oneCommentTotal = re.data.total
        })
      }
    },
    handleReply(item) {
      this.replyVisible = true
      this.commentForm.topicId = this.$route.query.id
      this.commentForm.parentCommentId = item.id
      this.commentForm.title = item.title
    },
    handleComment() {
      createComment(this.comment).then(re => {
        Object.assign({}, this.comment)
        if (re.code === 2000) {
          this.$notify({
            title: '成功',
            message: '评论成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    submitForm() {
      if (this.commentForm.content === null) {
        this.$notify({
          title: '失败',
          message: '评论内容不能为空',
          type: 'error',
          duration: 2000
        })
      } else {
        createComment(this.commentForm).then(re => {
          if (re.code === 2000) {
            this.$notify({
              title: '成功',
              message: '回复成功',
              type: 'success',
              duration: 2000
            })
            Object.assign({}, this.commentForm)
          }
          this.replyVisible = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
