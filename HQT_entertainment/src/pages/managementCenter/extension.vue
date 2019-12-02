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
    name: 'extension',
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
            .mixin_div(100%,70px,#2C4564,white,left);
            text-indent: 20px;
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
                .mixin_center(180px,180px);
                background: #a1cff1;
                border-radius: 4px;
            }
        }
    }
    .copy_link,.more_link{
        .mixin_div(100%,35px,#236593,#fcfcfa,center);
        border: 1px solid #209eeb;
    }
    .more_link{
        background: #9ac8ea;
        color: #04080b;
        margin-top: 10px;
    }


}
</style>