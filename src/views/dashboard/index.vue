<template>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  height: auto;
  float: left;
  border-bottom: 2px solid #bead99;
  margin-top: 15px;
}
.igongxiao {
  width: 255px;
  height: 475px;
  float: left;
  background: #e0e0e0;
  padding: 0 15px;
  a.more {
    margin-top: 12px;
    float: right;
    font-size: 13px;
    color: #8c203a;
    text-transform: uppercase;
  }
  .igxlist {
    font-weight: bold;
    width: 100%;
    height: auto;
    float: left;
    padding: 0 15px;
    margin-top: 13px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    a {
      width: auto;
      height: auto;
      float: left;
      font-size: 14px;
      color: #000000;
      line-height: 36px;
      margin-right: 10px;
    }
  }
}
.sideBox {
  width: 610px;
  height: 475px;
  overflow: hidden;
  position: relative;
  float: left;
}
.biaoti {
  color: #8c203a;
  font-size: 28px;
}
.itt {
  width: 285px;
  height: 475px;
  float: left;
  background: #463c3a;
  .title {
    width: 100%;
    height: auto;
    float: left;
    em {
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      width: 7px;
      height: 7px;
      border-radius: 7px;
      margin: 0 10px;
    }
  }
  i {
    width: 4px;
    height: 18px;
    background: #ffffff;
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
    margin-right: 12px;
  }
  h2 {
    height: 47px;
    line-height: 47px;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #ffffff;
  }
  .ittlist {
    width: 100%;
    height: auto;
    float: left;
    ul {
      width: 100%;
      height: auto;
      float: left;
      padding-left: 20px;
      box-sizing: border-box;
      li {
        a {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          width: 100%;
          height: auto;
          float: left;
          font-size: 14px;
          color: #d8d5d5;
          line-height: 35px;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.iyck {
  width: 820px;
  float: left;
}
.h2tit {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 15px;
  a.more {
    margin-top: 12px;
    float: right;
    font-size: 13px;
    color: #8c203a;
    text-transform: uppercase;
  }
  h2 {
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    color: #ab853c;
    font-weight: normal;
    margin-left: 85px;
    padding-right: 5px;
    float: left;
  }
}
.iyckqh {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 5px;
  .tab-hd {
    width: 100%;
    height: auto;
    float: left;
    ul {
      width: 100%;
      height: 32px;
      line-height: 30px;
      background: #929292;
      float: left;
      border: 1px solid;
      li {
        padding: 0 35px;
        height: auto;
        float: left;
        font-size: 16px;
        border-right: 1px solid #7c7c7c;
        cursor: pointer;
        list-style: none;
      }
    }
  }
  .ycklist {
    width: 100%;
    height: auto;
    float: left;
    margin-top: 20px;
    margin-bottom: 20px;
    table {
      tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        td {
          border-bottom: 1px dashed #a4a3a1;
          vertical-align: middle;
          .zm {
            width: 85px;
            border-right: 1px dashed #a4a3a1;
            text-align: center;
          }
          .lj {
            padding-left: 30px;
            padding-top: 16px;
            padding-bottom: 16px;
          }
          a {
            font-size: 14px;
            line-height: 24px;
            color: #242424;
            display: inline-block;
            margin: 0 7px;
            padding: 0 5px;
          }
        }
      }
    }
  }
}
.td {
  border-bottom: 1px dashed;
  vertical-align: middle;
}
.isline {
  width: 1px;
  height: 490px;
  border-left: 1px dashed #a4a3a1;
  margin-top: 24px;
  margin-left: 12px;
}
.ixtcx {
  width: 340px;
  height: auto;
  float: right;
  .ixtcxtable {
    width: 100%;
    float: left;
    margin-top: 26px;
    a {
      font-size: 14px;
      height: 72px;
      line-height: 72px;
      color: #242424;
      display: inline-block;
      text-align: center;
      width: 170px;
      float: left;
    }
  }
}
</style>
