<template>
<section id="finance_information">
    <div class="cards_frame">
        <div class="cards_title">财务信息</div>
        <div class="cards_content">
                <div class="classification" v-for="(item,index) in information">
                        <div class="detailed_theme">{{item.theme}}</div>
                        <div class="detailed_content">{{item.count}}</div>
                </div>
        </div>
    </div>

</section>
</template>

<script>
export default{
    name: 'finance_information',
    data(){
        return{
                information: [
                            {theme: '存款人数',count: '10'},
                            {theme: '存款总额',count: '1000.00'},
                            {theme: '流水',count: '50000.00'},
                            {theme: '税水',count: '1000.00'}
                        ]
        }
    }
}
</script>

<style lang="less" scoped>
#finance_information{
    width: 100%;
    .cards_frame{
        width: 100%;
        height: 520px;
        border-top: 3px solid #8bc6ee;
        margin-bottom: 45px;
        .cards_title{
            .mixin_div(100%,70px,#2C4564,white,left);
            text-indent: 20px;
            font-weight: 600;
            font-size: 16px;
        }
        .cards_content{
            width: 100%;
            height: 450px;
            background: #243851;
            padding: 50px 0px 0px 62.5px;
            box-sizing: border-box;
            .classification{
                .mixin_float(345px,155px,left);
                margin: 0px 25px 25px 0px;
                .detailed_theme{
                    .mixin_div(100%,45px,#324c6d,#edf7f8,left);
                    text-indent: 30px;
                }
                .detailed_content{
                    .mixin_div(100%,110px,#2c4564,#1dfa5f,center);
                    font-size: 48px;
                }

            }
 
        }
    }


}
</style>