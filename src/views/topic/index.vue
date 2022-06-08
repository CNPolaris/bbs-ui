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
              {{ topic.createTime }}
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
          <div class="topicContent" v-html="topic.content">

          </div>
        </div>
      </div>
      <div class="commentModule">
        <ol class="commentList">
          <div class="commentInfo" v-for="item in commentList" :key="item.id">
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
            </div>
            <div class="commentContent">
              <span v-html="item.comment.content" />
            </div>
            <div class="clearfix" />
            <div class="replyList">
              <ul>
                <li v-for="comment in item.replyList">
                  <div class="reply-top">
                    <a class="avatarBox">
                      <img :src="comment.avatar" alt="头像">
                    </a>
                    <a class="userName">
                      {{ comment.nickName }}
                    </a>
                    <span class="time">
                      {{ comment.createTime|formatDateTime }}
                    </span>
                  </div>
                  <div class="replyContent">
                    <span v-html="comment.content" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ol>
      </div>
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

export default {
  components: { Tinymce },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  data() {
    return {
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
      commentList: [],
      commentTotal: [],
      commentPage: {
        page: 1,
        limit: 5,
        topicId: null,
        twoPage: 1,
        twoLimit: 3
      }
    }
  },
  created() {
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
        _this.commentList = re.data.list
        _this.commentTotal = re.data.total
      })
    }
  },
  methods: {
    handleComment() {
      console.log("评论")
      createComment(this.comment).then(re => {
        if (re.code === 2000) {
          this.$notify({
            title: '成功',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        }
        this.comment = null
      })
    }
  }
}
</script>

<style scoped>

</style>
