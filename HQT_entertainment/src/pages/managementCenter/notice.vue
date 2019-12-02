<template>
<section id="notice_center">
    <div class="cards_frame">
        <div class="cards_title">系统公告</div>
        <div class="cards_content">
             <div class="system_notice_left">
                     <div class="system_notice_tab">
                        <ul>
                             <li v-for="(item,index) in notice_list" :class="{'notice_active':item.active}" @click="noticeChange(index)">{{item.theme}}</li>
                        </ul>
                     </div>
                     <div class="carousel">
                            <div class="carousel_left">
                                <span><i class="el-icon-d-arrow-left"></i></span>
                                <span><i class="el-icon-arrow-left"></i></span>
                            </div>
                            <div class="carousel_list">
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                </ul>
                            </div>
                            <div class="carouse_right">
                                <span><i class="el-icon-d-arrow-right"></i></span>
                                <span><i class="el-icon-arrow-right"></i></span>
                            </div>
                     </div>
             </div>
             <div class="system_notice_right">
                     <div class="notice_title">发哟哦依然属于进来咯</div>
                     <div class="notice_content">
                         <div class="greet">叩叩叩咯:</div>
                         <div class="notice_information">萍萍萍萍萍萍萍萍萍萍萍萍萍萍萍萍萍萍顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶呃呃呃呃呃呃呃呃呃呃呃呃</div>
                         <div class="sender">黑杰克</div>
                         <div class="sender_date">2019年6月9日</div>
                     </div>
             </div>
        </div>
    </div>



</section>
</template>

<script>
export default{
    name: 'notice_center',
    data(){
        return{
            notice_list: [{theme: '健康饮食',active: true},{theme: '营养食谱',active: false},{theme: '绿色食品',active: false}]
        }
    },
    methods:{
        noticeChange(index){
            for(let i=0;i<this.notice_list.length;i++){
                this.notice_list[i].active = false;
            }
            this.notice_list[index].active = true;
        }
    }
}
</script>

<style lang="less" scoped>
#notice_center{
    width: 100%;
    .cards_frame{
        width: 100%;
        height: 600px;
        border-top: 3px solid #8bc6ee;
        margin-bottom: 25px;
        .cards_title{
            .mixin_div(100%,70px,#2C4564,white,left);
            text-indent: 20px;
            font-weight: 600;
            font-size: 16px;
        }
        .cards_content{
            width: 100%;
            height: 530px;
            background: #243851;
            .system_notice_left{
                .mixin_float(275px,530px,left);
                border-right: 1px solid #435772;
                .notice_active{
                    background: #2c4564;
                }
                .system_notice_tab{
                    width: 275px;
                    height: 500px;
                    padding: 10px 0px 0px 0px;
                    box-sizing: border-box;
                    ul{
                        width: 100%;
                        li{
                            width: 100%;
                            height: 40px;
                            padding: 0px 12px 0px 12px;
                            box-sizing: border-box;
                            color: #edfdff;
                            text-align: left;
                            line-height: 40px;
                        }
                    }
                }
                .carousel{
                    width: 275px;
                    height: 30px;
                    border-top: 1px solid #435772;
                    padding: 2px 10px 0px 10px;
                    box-sizing: border-box;
                        .mixin_carouse(){
                            .mixin_span(24px,24px,none,white,center);
                            border-radius: 50%;
                            float: left;
                            border: 1px solid #03a2dc;
                        }
                    .carousel_left{
                        .mixin_float(55px,30px,left);
                        span:nth-of-type(1){
                            .mixin_carouse();
                        }
                        span:nth-of-type(2){
                            .mixin_carouse();
                            margin-left: 5px;
                        }
                    }
                    .carousel_list{
                        .mixin_float(145px,30px,left);
                        ul{
                            width: 112px;
                            height: 30px;
                            margin: 0px auto;
                            li{
                                .mixin_carouse();
                                margin-left: 4px;
                            }
                        }
                    }
                    .carouse_right{
                            .mixin_float(55px,30px,right);
                        span:nth-of-type(1){
                            .mixin_carouse();
                            float: right;
                        }
                        span:nth-of-type(2){
                            .mixin_carouse();
                            margin-right: 5px;
                            float: right;
                        }
                    }
                }
            }
            .system_notice_right{
                .mixin_float(565px,530px,right);
                padding: 20px 25px 0px 25px;
                box-sizing: border-box;
                .notice_title{
                    .mixin_div(100%,50px,none,#f1f5f6,center);
                     border-bottom: 1px solid #435772;
                     font-size: 18px;
                }
                .notice_content{
                    width: 100%;
                    height: 460px;
                    .greet{
                        .mixin_div(100%,30px,none,#f1f5f6,left);
                        margin-top: 10px;
                    }
                    .notice_information{
                        width: 100%;
                        min-height: 100px;
                        text-indent: 30px;
                        color: #f1f5f6;
                    }
                    .sender{
                        .mixin_div(100%,25px,none,#f1f5f6,right);
                    }
                    .sender_date{
                        .mixin_div(100%,25px,none,#f1f5f6,right);
                    }                    
                }
            }
        }
    }



}
</style>