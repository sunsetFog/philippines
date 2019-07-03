<template>
    <section id="keyboard">
        <el-dialog
        :visible.sync="rechargeActive"
        width="1100px"
        top="190px"
        center>
        <div slot="title">键盘</div>
        <div class="varieties_content">
            <div class="area_cotent">
                <input type="text" disabled v-model="key_input" placeholder="请输入密码"/>
            </div>
            <div style="height: 350px;padding-left: 190px;box-sizing: border-box;">
                <ul class="keyboard">
                    <li v-for="(key,index) in keyList" :key="index" track-by="$index" :class="{delete: key === 'Delete', tab: key === 'Tab', capslock: key === 'Caps', enter: key === 'Enter', shift: key === 'Shift', space: key === 'Space', shifted: (key === 'Shift') && hasShifted, capsed: (key === 'Caps') && hasCapsed }" v-text="key" @click="clickKey(key)"></li>
                </ul>
            </div>
            <div class="submit_example">
                <button @click="determine()">确定</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
        <div slot="footer" class="example_footer">

        </div>
        </el-dialog>
    </section>

</template>
<script>
    export default {
        data() {
            return {
                rechargeActive: false,
                key_input: '',
                keyList: [],
                normalKeyList: [],
                shiftedKeyList: [],
                capsedKeyList: [],
                hasShifted: false,
                hasCapsed: false,
                keyvalue:this.keyboardtext
            }
    },
    created(){
      this.ready();
    },
    methods: {
            changeMeans(){
                this.rechargeActive = true;
                this.key_input = '';
                this.keyvalue = 'undefined';
            },
            determine(){
                this.rechargeActive = false;
                this.$parent.keyMeans(this.key_input);
            },
            cancel(){
                this.rechargeActive = false;
            },
            clickKey(key) {
                switch(key) {
                    case "Delete":
                        let kbt = this.keyvalue;
                        this.keyvalue = kbt.length ? kbt.substring(0, kbt.length - 1) : kbt;
                        break;

                    case "Tab":
                        this.keyvalue += "\t";
                        break;

                    case "Enter":
                        this.keyvalue += "\n";
                        break;

                    case "Space":
                        this.keyvalue += " ";
                        break;

                    case "Caps":
                        this.hasCapsed = !this.hasCapsed;
                        this.keyList = this.hasCapsed ? this.capsedKeyList : this.normalKeyList;
                        break;

                    case "Shift":
                        this.hasShifted = !this.hasShifted;
                        this.keyList = this.hasShifted ? this.shiftedKeyList : this.normalKeyList;
                        break;
          
                    default:
                        this.keyvalue += key;
                        break;
                }
                this.key_input = this.keyvalue.substring(9);
      },
      ready() {
            let normalKeyList = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
                        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
                        'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
                        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', 
                        'Space'], 

                shiftedKeyList = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete',
                        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
                        'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
                        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', 
                        'Space'],

                capsedKeyList = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
                        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
                        'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
                        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', 
                        'Space'];

            this.keyList = this.normalKeyList = normalKeyList;
            this.shiftedKeyList = shiftedKeyList;
            this.capsedKeyList = capsedKeyList;
        }
        },
    
    }
</script>

<style lang="less" scoped>
#keyboard{
    .varieties_content{
        width: 100%;
        height: 620px;
        .area_cotent{
            width: 100%;
            height: 50px;
            margin: 50px 0px 80px 0px;
            padding-left: 350px;
            input{
                .mixin_input(300px,45px);
                background: #fff;
                cursor: not-allowed;
            }
        }

        .keyboard {
            width: 688px;
            margin: 0;
            padding: 0;
            list-style: none;
            user-select: none;

            li {
                float: left;
                margin: 0 5px 5px 0;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #fff;
                border: 1px solid #e5e5e5;
                border-radius: 5px;

                &:hover {
                    position: relative;
                    border-color: gray;
                    cursor: pointer;
                }
                &:active {
                    top: 1px;
                    left: 1px;
                }
            }

            .tab, .delete {
                width: 70px;
            }
            .capslock {
                width: 80px;
            }
            .enter {
                width: 77px;
            }
            .shift {
                width: 102px;
            }
            .space {
                clear: left;
                width: 681px;
            }
            .shifted {
                position: relative;
                top: 1px;
                left: 1px;
                border-color: #e5e5e5;
                cursor: pointer;
            }
            .capsed {
                position: relative;
                top: 1px;
                left: 1px;
                border-color: #e5e5e5;
                cursor: pointer;
            }
        }
        .submit_example{
            width: 100%;
            height: 60px;
            padding-left: 410px;
            box-sizing: border-box;
            button:nth-of-type(1){
                .mixin_button(115px,34px,@color_white2,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                float: left;
            }
            button:nth-of-type(1):hover{
                background: @color_white2_hover;
            }
            button:nth-of-type(2){
                .mixin_button(115px,34px,@color_indigo,@color_blueviolet);
                border: 1px solid @color_blueviolet;
                float: left;
                margin-left: 40px;
            }
            button:nth-of-type(2):hover{
                background: @color_indigo_hover;
            }
        }

    }
    .example_footer{
        .mixin_div(100%,35px,none,auto,left);
    }
}

</style>