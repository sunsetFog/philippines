<template>
<section id="extension">
    <div class="cards_frame">
        <div class="cards_title">推广</div>
        <div class="cards_content">
             <div class="link_frame"></div>
        </div>
    </div>
    <div class="copy_link">复制推广连接</div>
    <div class="more_link">更多推广连接</div>

</section>
</template>

<script>
export default{
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
#extension{
    width: 100%;
    .cards_frame{
        width: 100%;
        height: 335px;
        border-top: 3px solid #8bc6ee;
        margin-bottom: 25px;
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
            height: 265px;
            background: #243851;
            padding: 50px 0px 0px 62.5px;
            box-sizing: border-box;
            position: relative;
            .link_frame{
                width: 180px;
                height: 180px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -90px 0px 0px -90px;
                background: #a1cff1;
                border-radius: 4px;
            }
        }
    }
    .copy_link,.more_link{
            width: 100%;
            height: 35px;
            line-height: 35px;
            background: #236593;
            text-align: center;
            color: #fcfcfa;
            border: 1px solid #209eeb;
    }
    .more_link{
        background: #9ac8ea;
        color: #04080b;
        margin-top: 10px;
    }


}
</style>