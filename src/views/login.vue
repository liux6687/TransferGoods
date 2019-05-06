<style scoped lang="less">
  .container-fluid,
  .row,
  .right,
  .left {
    height: 100%;
  }

  .container-fluid {
    position: absolute;
    width: 100%;

    .row {
      display: flex;
    }
  }

  .right {
    background-image: url(../assets/images/bg.png);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 120px;
    padding-left: 12.5%;
    flex: 0 0 52%;
    position: relative;
  }

  input {
    outline: none;
  }

  .right .autoimg {
    margin-top: 16px;
  }

  .left {
    background-image: url(../assets/images/yingy2.png);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 166px;
    padding-left: 130px;
    flex: 0 0 48%;
  }

  .left .font-1 {
    margin-top: 26px;
  }

  .user,
  .pass {
    border-bottom: 2px solid #010101;
    width: 510px;
    position: relative;
    left: 0;
    top: 0;
    height: 40px;
  }

  .user input,
  .pass input {
    border: none;
    width: 486px;
    position: absolute;
    left: 30px;
    line-height: 24px;
    color: #010101;
    font-size: 16px;
    padding-left: 10px;
    background: transparent;
  }

  .user {
    margin-top: 120px;
  }

  .pass {
    margin-top: 62px;
  }

  .user .user-img,
  .pass .pass-img {
    position: absolute;
    left: 0;
    top: 0;
  }

  .pass .hide-pass-img {
    position: absolute;
    right: 0;
    top: 8px;
    cursor: pointer;
  }

  .sub-btn {
    width: 200px;
    height: 82px;
    margin-top: 64px;
    margin-left: -12px;
    color: transparent;
    border: none;
    background-color: transparent;
    background-image: url(../assets/images/login-bg2.png);
    cursor: pointer;
  }

  .taobao-img {
    margin-top: 40px;
  }

  .right .icons {
    position: absolute;
    bottom: 10.8%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="right" ref="right">
        <div>
          <img src="../assets/images/zidong.png" alt="自动改价" class="zidong">
        </div>
        <div>
          <img src="../assets/images/Automaticpricechange.png" alt="自动改价" class="autoimg">
        </div>
        <div class="icons">
          <img src="../assets/images/24-2.png" alt="自动改价" class="gai-1"/>
          <img src="../assets/images/cao-2.png" alt="自动改价" class="gai-2">
          <img src="../assets/images/gai-2.png" alt="自动改价" class="gai-3">
        </div>
      </div>
      <div class="left">
        <div>
          <img src="../assets/images/Login.png" alt="登录" class="login">
        </div>
        <div>
          <img src="../assets/images/font-1.png" alt="登录" class="font-1">
        </div>
        <form method="post">
          <div class="user" ref="divUser" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
            <img src="../assets/images/user.png" alt="用户" class="user-img"/>
            <input type="text" name="user" id="user" placeholder="请输入用户名或手机号" ref="user"/>
          </div>
          <div class="pass" ref="divPass" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
            <img src="../assets/images/pass.png" alt="密码" class="pass-img"/>
            <input :type="pass" name="pass" id="pass" placeholder="请输入密码" ref="pass"/>
            <img src="../assets/images/hide-pass.png" alt="显示密码" class="hide-pass-img" @mousedown.left="passDown"
                 @mouseup.left="passUp"/>
          </div>
          <input type="button" class="sub-btn" value="登录"/>
        </form>
        <a
          href="https://oauth.taobao.com/authorize?response_type=code&client_id=23763997&redirect_uri=http://api.taoesoft.com/caiwu.aspx&view=web&state=https%3A%2F%2Fcw.tosneaker.com%2Fstore%2Fcallback%3Fact%3Dbindshop_do"><img
          src="../assets/images/taobao2.png" alt="淘宝" class="taobao-img"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        pass: 'password'
      }
    },
    methods: {
      passDown() {
        this.pass = 'text';
      },
      passUp() {
        this.pass = 'password';
      },
      adapt() {
        if (window.innerHeight < 800) {
          this.jQuery('.user').css({
            'margin-top': '70px'
          });
          this.jQuery('.left').css({
            'padding-top': '86px',
          });
          this.jQuery('.right').css({
            'padding-top': '60px'
          });
        }
        if (window.innerWidth <= 1440) {
          this.jQuery('.left').css({
            'padding-left': '100px'
          });
          this.jQuery('.right').css({
            'padding-top': '60px'
          });
        }
      }
    },
    mounted() {
      this.adapt();
      this.jQuery.resize(() => {
        this.adapt();
      });
    }
  }
</script>
