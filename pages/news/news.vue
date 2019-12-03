<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput">
			<view class="flex align-center justify-center w-100">
				<view class="mx-1" @click="changeTab(index)"
				v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-lg text-main '">
				{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>
		<!-- 列表 -->
		<swiper  :current="tabIndex" :duration="150"
		:style="'height:'+scrollH+'px;'" @change="onChangeTab"
		>
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				@scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<commonList :item="item" :index="inde" @doSupport="doSupport"></commonList>
						<divider></divider>
					</block>
					<load-more :loadmore="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<block v-for="(item,index) in list" :key="index">
						<commonList :item="item" :index="inde" @doSupport="doSupport"></commonList>
						<divider></divider>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
						username:"昵称",
						userpic:"/static/default.jpg",
						newstime:"2019-11-28 14:10",
						isFollow:true,
						title:"测试标题",
						titlepic:"/static/demo/datapic/2.jpg",
						support:{
							type:"support",
							support_count:1,
							unsupport_count:2
						},
						comment_count:2,
						share_num:0
					},
					{
						username:"昵称",
						userpic:"/static/default.jpg",
						newstime:"2019-11-28 14:10",
						isFollow:true,
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
						isFollow:true,
						title:"测试标题",
						titlepic:"",
						support:{
							type:"",
							support_count:1,
							unsupport_count:2
						},
						comment_count:2,
						share_num:3
					}];
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import commonList from '@/components/common/common_list.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components:{
			uniNavBar,
			commonList,
			loadMore
		},
		data() {
			return {
				scrollH:500,
				tabIndex:0,
				tabBars:[{
					name:'关注'
				},{
					name:'话题'
				}],
				list:[],
				loadmore:"上拉加载更多"
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollH = res.windowHeight -res.statusBarHeight-44;
				}
			})
			this.list = demo
		},
		methods: {
			// 打开发布页
			openAddInput(){
				uni.redirectTo({
					url:'../add-input/add-input'
				})
			},
			changeTab(index){
				this.tabIndex = index
			},
			// 滑动事件
			onChangeTab(e){
				this.tabIndex = e.detail.current
			},
			// 顶踩操作
			doSupport(e){
				let item = this.list[e.index];
				let msg = e.type==='support'?'顶':'踩';
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
			},
			// 上啦加载
			loadmoreEvent(){
				if(this.loadmore !== '上拉加载更多')return;
				this.loadmore = '加载中...';
				setTimeout(()=>{
					this.list = [...this.list,...this.list]
					this.loadmore = '上拉加载更多';
				},2000)
			}
		}
	}
</script>

<style>

</style>