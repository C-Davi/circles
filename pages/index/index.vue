<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
			<!-- 全局分割线 -->
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import commonList from "@/components/common/common_list.vue";
	export default {
		components:{
			commonList
		},
		data() {
			return {
				list:[
					{
						username:"昵称",
						userpic:"/static/default.jpg",
						newstime:"2019-11-28 14:10",
						isFollow:false,
						title:"测试标题",
						titlepic:"/static/demo/datapic/2.jpg",
						support:{
							type:"support",
							support_count:1,
							unsupport_count:2
						},
						comment_count:2,
						share_num:3
					},
					{
						username:"昵称",
						userpic:"/static/default.jpg",
						newstime:"2019-11-28 14:10",
						isFollow:false,
						title:"测试标题",
						titlepic:"",
						support:{
							type:"unsupport",
							support_count:1,
							unsupport_count:2
						},
						comment_count:2,
						share_num:3
					},
					{
						username:"昵称",
						userpic:"/static/default.jpg",
						newstime:"2019-11-28 14:10",
						isFollow:false,
						title:"测试标题",
						titlepic:"",
						support:{
							type:"",
							support_count:1,
							unsupport_count:2
						},
						comment_count:2,
						share_num:3
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			// 关注事件
			follow(e){
				this.list[e].isFollow=true;
				uni.showToast({
					title:'关注成功'
				});
			},
			// 顶踩操作
			doSupport(e){
				let item = this.list[e.index];
				let msg = e.type==='support';
				if(item.support.type===''){
					item.support[e.type+'_count']++;
				} else if(item.support.type==='support' && e.type==='unsupport'){
					item.support.support_count--;
					item.support.unsupport_count++;
				} else if(item.support.type==='unsupport' && e.type==='support'){
					item.support.unsupport_count--;
					item.support.support_count++;
				}
				item.support.type=e.type;
				uni.showToast({
					title:msg+'成功'
				})
			}
		}
	}
</script>

<style>
	
</style>
