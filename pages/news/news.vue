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
		<swiper  :duration="150"
		:style="'height:'+scrollH+'px;'"
		>
			<swiper-item >
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				>
					<!-- 有数据 -->
					
					<!-- 无数据 -->
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components:{
			uniNavBar
		},
		data() {
			return {
				scrollH:500,
				tabIndex:0,
				tabBars:[{
					name:'关注'
				},{
					name:'话题'
				}]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollH = res.windowHeight -res.statusBarHeight-44;
				}
			})
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
			}
		}
	}
</script>

<style>

</style>