<style lang="scss">
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
    // @import "uview-ui/index.scss";
    .titleNview-placing {
        height: var(--status-bar-height);
        padding-top: 44px;
        box-sizing: content-box;
    }
</style>
<style>
	/* @import url('static/aliIcon/iconfont.css'); */
</style>
<script>
    export default {
        onLaunch: function() {
            // #ifdef APP-PLUS
            const _self = this;
            const _handlePush = function(message) {
                // TODO  
            
                setTimeout(function() {
                    uni.reLaunch({
                        url: '/pages/my/information/messages'
                    })
                }, 2000);
            };
            plus.push.addEventListener('click', _handlePush);
            plus.push.addEventListener('receive', _handlePush);
            
            // setTimeout(function() {
                const clientInfo = plus.push.getClientInfo()
                uni.setStorageSync('cid', clientInfo.clientid);
            // }, )
            
            // #endif  

        },
        // onLaunch: function() {
        // 	console.log('App Launch')
        // },
        onShow: function() {
            console.log('App Show')
            
            
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
    /*每个页面公共css */
</style>
