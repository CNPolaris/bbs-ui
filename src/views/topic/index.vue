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
    </div>
  </div>
</template>

<script>
import { selectTopic } from '@/api/topic'

export default {
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
      }
    }
  },
  created() {
    const id = this.$route.query.id
    const _this = this
    if (id && parseInt(id) !== 0) {
      selectTopic(id).then(re => {
        _this.topic = re.data
      })
    }
  }
}
</script>

<style scoped>

</style>
