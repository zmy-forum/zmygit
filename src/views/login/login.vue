<template>
    <div>
        <HeadTop head-title="" go-back="true" ></HeadTop>
        <div id="wrapper">
            <div id="middle" class="container">
                <div class="title">hello，欢迎回来</div>
                <div class="account-form">
                    <div class="account-form-group has-error">
                        <!--下面这行是为了避免chrome自动填充，触发focus和blur事件-->
                        <input type="text" name="txtuserid" style="display:none">
                        <input type="text" name="txtuserid" class="account-form-control js-input-name"  v-model.trim="uid"  autocomplete="off"  maxlength="19" placeholder="uid">
                    </div>
                    <div class="account-form-group has-error">
                        <!-- 下面这行是为了避免chrome自动填充，触发focus和blur事件 -->
                        <input type="text" name="txtuserName" style="display:none">
                        <input type="text" name="txtuserName" class="account-form-control js-input-name"  v-model.trim="name"  autocomplete="off"  maxlength="20" placeholder="用户名">
                    </div>
                    <div class="account-form-group has-error">
                        <!--下面这行是为了避免chrome自动填充，触发focus和blur事件-->
                        <input :type="inputType" name="txtPassword" style="display:none">
                        <input :type="inputType" name="txtPassword" class="account-form-control js-input-password"  autocomplete="off"  v-model.trim="password"  maxlength="20" placeholder="请输入密码">
                        <i class="imwap-visibility js-showpw iconfont" :class="passwordClass" @click="showPW"></i>
                    </div>
                    <div class="account-form-group button-row">
                        <div class="account-form-tip js-error"></div>
                        <div class="account-form-btn js-btn-login" @click="submit">登录</div>
                    </div>
                    <div>
                        还没有账号？立即 <router-link to='/register'>注册</router-link>
                    </div>
                </div>
            </div>
            <div class="account-sns-login">
                <div class="tit">
                    <div class="line"></div>
                    <p>测试环境仅支持已有账号登录</p>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTop from '@/components/header/Head'
    import axios from 'axios'
    import jwtDecode from 'jwt-decode'
    export default {
        name: "login",
        data(){
            return{
                name:'',
                password: '',
                id:'',
                uid:'',
                inputType : "password",
                passwordClass: "icon-input-show",
            }
        },

        components:{
            HeadTop
        },
        methods:{
            //提交登录
         submit (){
                let userName = this.name;
                let password = this.password;
                let uid=this.uid;
                // console.log(userName,password,uid)

                // if(validateUserName(userName) != "ok"){
                //     this.$toast('用户名格式不正确');
                //     return;
                // }
                if(validatePassword(password) != "ok"){
                    this.$toast('密码格式不正确');
                    return;
                }
                var data={ "password":password,"uid":uid,"username":userName}
               axios.post('http://www.coldairance.com/tuitui/login',data,{headers:{'Content-Type':'application/json'}})
                    .then(res => {
                        // console.log(res.data);
                        // console.log(res.data.data.token)
                        localStorage.setItem("tuitui",JSON.stringify(res.data.data.token))
                        // var token=res.data.data.token
                        // console.log("www",jwtDecode(token))
                        this.$router.push("./classify")
                        return res.data;
                    }).catch(res=> {
                        console.log(res);
                    });
            },
            //密码可见
            showPW(){
                if(this.inputType == "password"){
                    this.inputType = "text";
                }else{
                    this.inputType = "password";
                }
                if(this.passwordClass == "icon-input-show"){
                    this.passwordClass = "icon-input-password";
                }else{
                    this.passwordClass = "icon-input-show";
                }
            },
        }
    }
    function validateUserName(userName){
        if(userName == null || userName == "")
            return "用户名不能为空";
        let userNameLen = userName.length;
        if(userNameLen >20 || userNameLen<2){
            return "账号长度为2-20位，请重新输入";
        }
        // /u4e00-/u9fa5上述是以汉字开始以汉字结束。
        let regu1 = "^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$";
        let re = new RegExp(regu1);
        if (!re.test(userName)) {
            return "用户名只能包含字母、汉字、数字";
        }

        return "ok";
    }

    function validatePassword(password){
        if(password == null || password == "" ){
            return "密码不能为空";
        }

        let passwordLen = password.length;
        if(passwordLen >20 || passwordLen<6){
            return "密码长度为6-20位，请重新输入";
        }
        let pwRegu = "^(?!_)(?!.*?_$)[a-zA-Z0-9]+$";
        let pwRe = new RegExp(pwRegu);
        if (!pwRe.test(password)) {
            return "密码只能包含数字和字母";
        }
        return "ok";
    }


</script>

    <style lang="scss" scoped>

    #wrapper{
        background-color: #fff;
        height: 100%;
        width: 100%;
        position: fixed;
    }
    .container {
        padding: .8rem;
        font-size: .37333333rem;
        .title {
            font-size: 26px;
            font-weight: bold;
        }
        .account-form {
            text-align: center;
            margin-top: 1rem;
            .account-form-group {
                position: relative;
                overflow: hidden;
                padding-bottom: .4rem;
                .account-form-control {
                    margin-bottom: .21333333rem;
                    padding-left: .13333333rem;
                    display: block;
                    width: 100%;
                    color: #787d82;
                    box-sizing: border-box;
                    border-bottom: 1px solid #d9dde1;
                    height: 1.33333333rem;
                    font-size: .37333333rem;
                    .verify {
                        float: left;
                        width: 4.8rem;
                    }
                    .verify-row {
                        display: none;
                    }
                }
                .account-form-tip {
                    display: none;
                    color: #FF2D50;
                    clear: both;
                    font-size: .32rem;
                    line-height: .53333333rem;
                    text-align: left;
                }
                .imwap-visibility {
                    position: absolute;
                    color: #333;
                    top: .42666667rem;
                    right: .13333333rem;
                    font-size: 16px;
                }
                .icon-cha{
                    position: absolute;
                    color: #333;
                    top: .42666667rem;
                    right: .13333333rem;
                    font-size: 14px;
                }
                .account-form-btn {
                     display: block;
                     margin-top: .8rem;
                     color: #fff;
                     background: #f9a74b;
                     font-size: .42666667rem;
                     line-height: 1.2rem;
                     border-radius: .13333333rem;
                 }
                img {
                    float: right;
                    border: 1px solid #d9dde1;
                    box-sizing: border-box;
                    height: 1.12rem;
                }

            }
        }
        .forget-password-box{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: .13333333rem;
            a{
                display: block;
                height: .45333333rem;
                padding: 0 .53333333rem;
                font-size: 14px;
                line-height: .45333333rem;
            }
        }
    }
    .account-sns-login {
        margin-top: 2rem;
        height: 100px;
        width: 100%;
        .tit {
            display: flex;
            justify-content: center;
            align-items: center;
            .line {
                margin: 0 .26666667rem;
                width: 1.28rem;
                height: .05333333rem;
                background-color: #e8e8e8;
            }
            p {
                color: #aeaeae;
            }
        }
        ul {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: .53333333rem;
            .account-sns-login ul li {
                margin: 0 .8rem;
                i {
                    font-size: 30px;
                    color: #cbcbcb;
                }
            }
        }
    }
.bot_text{
			position: absolute;
			color:#eee;
			width: 100%;
			text-align: center;
			top:130px;
			font-size: 14px;
 
		}
</style>