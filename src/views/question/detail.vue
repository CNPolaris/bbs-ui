<template>
  <div class="main wrap">
    <div class="questionContentModule">
      <div class="left">
        <div class="question-wrap">
          <div class="questionBox">
            <div class="title">
              {{ question.title }}
            </div>
            <div class="questionInfo clearfix">
              <div class="postTime">
                {{ question.createTime|formatDateTime }}
              </div>
              <div class="viewTotal">
                {{ question.readCount }}次阅读
              </div>
              <div class="viewTotal">
                {{ question.answerCount }}个回答
              </div>
            </div>
            <div class="content" v-html="question.content" />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="userInfo-wrap clearfix">
          <div class="author" style="text-align: center">
            <a style="outline: none; text-decoration: none;color: #A9AEB8">
              <img :src="question.avatar" alt="头像" style="width: 70px; height: 70px;border-radius: 50%">
            </a>
          </div>
          <p class="name" style="font-size: 18px;font-weight: 600;text-align: center;margin: 14px 0 4px 0;"> {{ question.nickName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import { selectQuestionDetail } from '@/api/question'
export default {
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created() {
    const id = this.$route.query.id
    const _this = this
    if (id && parseInt(id) !== 0) {
      selectQuestionDetail(id).then(re => {
        _this.question = re.data
      })
    }
  },
  data() {
    return {
      question: {
        title: null,
        content: null,
        createTime: null,
        readCount: 0,
        answerCount: 0,
        nickName: null,
        avatar: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.questionContentModule {
  margin: 50px auto auto auto;
  .left {
    float: left;
    width: 900px;
    height: auto;
    .question-wrap {
      background: #fff;
      box-shadow: 0 0px 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
      position: relative;
      .questionTag {
        padding-top: 15px;
        margin-left: 15px;
        margin-right: 70px;
      }
      .questionBox {
        height: auto;
        padding: 15px 15px 15px 15px;
        .title {
          color: #272E3B;
          font-weight: 600;
          font-size: 22px;
          border: none;
          line-height: 34px;
          margin: 9px 0 18px 0;
        }
        .questionInfo {
          color: #A9AEB8;
          font-size: 14px;
          border-bottom: 1px solid #F2F3F5;
          padding-bottom: 5px;
          .postTime {
            float: left;
          }
          .viewTotal{
            float: left;
            margin-left: 3px;
          }
        }
        .content {
          margin-top: 5px;
          padding: 20px 0;
          color: #272E3B;
          font-size: 16px;
          line-height: 1.75;
          word-wrap: break-word;
          min-height: 100px;
        }
      }
    }
    .answer-formModule {
      margin-top: 10px;
      .addAnswer-wrap {
        position: relative;
        background: #fff;
        padding: 15px 18px 60px 15px;
        box-shadow: 0 0 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
      }
    }
    .answerModule {
      margin-top: 10px;
      padding: 0 10px 50px 10px;
      position: relative;
      background: #fff;
      box-shadow: 0 0 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
      ol, ul, li {
        list-style: none;
      }
      .answerList {
        list-style: none;
        font-size: 15px;
        .answer {
          padding: 15px 0 5px 77px;
          border-bottom: 1px solid #F2F3F5;
          .answer-author {
            position: relative;
            color: #999;
            a {
              outline: none;
              text-decoration: none;
              color: #A9AEB8;
            }
            img {
              width: 60px;
              height: 60px;
              position: absolute;
              left: -72px;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              display: block;
            }
          }
          .info-container {
            font-style: normal;
            font-size: 0;
            .userName {
              display: inline-block;
              color: #86909c;
              font-size: 14px;
            }
          }
          .answerTime {
            margin-top: 3px;
            margin-bottom: 5px;
            color: #A9AEB8;
            font-size: 13px;
          }
          .answerContent {
            padding: 0;
            word-wrap: break-word;
            color: #272E3B;
            font-size: 15px;
            line-height: 1.75;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .right {
    float: right;
    width: 300px;
    height: auto;
    padding-bottom: 10px;
    .userInfo-wrap {
      background: #fff;
      box-shadow: 0 0 3px 0 rgb(0 0 0 / 2%), 0 4px 8px 0 rgb(0 0 0 / 2%);
      .userInfo {
        padding: 20px 0 20px 0;
        margin-left: 8px;
        margin-right: 8px;
        height: auto;
        overflow: hidden;
        position: relative;
        .author {
          text-align: center;
        }
        .name {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin: 14px 0 4px 0;
        }
      }
    }
  }
}

</style>
