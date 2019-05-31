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
            width: 100%;
            height: 70px;
            color: white;
            line-height: 70px;
            text-indent: 20px;
            background: #2C4564;
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
                width: 345px;
                height: 155px;
                float: left;
                margin: 0px 25px 25px 0px;
                .detailed_theme{
                    width: 100%;
                    height: 45px;
                    background: #324c6d;
                    color: #edf7f8;
                    line-height: 45px;
                    text-indent: 30px;
                }
                .detailed_content{
                    width: 100%;
                    height: 110px;
                    background: #2c4564;
                    text-align: center;
                    line-height: 110px;
                    color: #1dfa5f;
                    font-size: 48px;
                }

            }
 
        }
    }


}
</style>