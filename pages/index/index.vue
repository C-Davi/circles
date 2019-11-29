<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x="true" :scroll-into-view="scrollInto" scroll-with-animation
		class="scroll-row border-bottom border-light-secondary" style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" 
			class="scroll-row-item px-3 py-2 font-md" 
			:id="item.tid"
			:class="tabIndex === index ? 'text-main font-lg font-weight-bold' : '' "
			@click="changeTab(index,item.tid)"
			>{{item.name}}</view>
		</scroll-view>
		<!-- 选项卡下的渲染 -->
		<swiper  :duration="150" :current="tabIndex" @change="onChangeTab"
		:style="'height:'+scrollH+'px;'"
		>
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				@scrolltolower="loadmore(index)">
					<!-- 有数据 -->
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
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
						isFollow:false,
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
					}];
	import commonList from "@/components/common/common_list.vue";
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components:{
			commonList,
			loadMore
		},
		data() {
			return {
				// 列表高度
				scrollH:600,
				scrollInto:'',
				// 顶部选项卡
				tabIndex:0,
				tabBars:[
					{tid:1,name:'关注'},
					{tid:2,name:'推荐'},
					{tid:3,name:'关注'},
					{tid:4,name:'关注'}
				],
				newsList:[]
			}
		},
		// 监听搜索
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'../search/search'
			})
		},
		// 监听导航按钮的点击事件
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../add-input/add-input'
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollH = res.windowHeight -uni.upx2px(101);
				}
			})
			// 根据选项生成列表
			this.getData()
		},
		methods: {
			// 获取数据
			getData(){
				let arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						// 1加载更多 2加载中   3没有更多
						loadmore:'上拉加载更多',
						list:[]
					}
					if(i < 2){
						obj.list = demo;
					}	
					arr.push(obj);
				}
				this.newsList = arr;
				console.log(this.newsList)
			},
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
			// 头部选项卡切换
			changeTab(index,tid){
				if(this.tabIndex === index){
					return;
				}
				this.tabIndex = index;
				this.scrollInto = tid;
			},
			// 监听滑动切换关联
			onChangeTab(e){
				this.changeTab(e.detail.current)
			},
			// 上拉加载更多
			loadmore(index){
				// 拿到当前列表
				let item = this.newsList[index];
				if(item.loadmore !='上拉加载更多')return
				// 修改当前列表当前加载状态
				this.newsList[index].loadmore = '加载中';
				setTimeout(()=>{
					item.list = [...item.list,...item.list]
					// 回复加载状态
					item.loadmore = '上拉加载更多';
				},1000)
			}
		}
	}
</script>

<style>
	
</style>
