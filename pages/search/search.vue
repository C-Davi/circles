<template>
	<view>
		<template v-if="searchList.length === 0">
				<!-- 搜索历史 -->
				<view class="py-2 font-md px-2">搜索历史</view>
				<view class="flex flex-wrap">
					<view class="border rounded font mx-2 my-1 px-2"
					v-for="(item,index) in list" :key="index" hover-class="bg-light"
					@click="tapSearchHistory(item)"
					>{{item}}</view>
				</view>
		</template>
		<template v-else>
			<!-- 搜索数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</template>
	</view>
</template>

<script>
	import commentList from '@/components/common/common_list.vue'
	export default {
		components:{
			commentList
		},
		data() {
			return {
				searchText:'',
				// 搜索结果
				searchList:[],
				list:['沙雕乐园身边的沙雕朋友','每日沙雕打卡','咆哮2.0']
			}
		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text;
		},
		// 监听导航搜索按钮
		onNavigationBarButtonTap(e) {
			if(e.index ===0){
				this.searchEvent()
			}
		},
		// 监听输入框搜索内容
		methods: {
			// 点击搜索历史
			tapSearchHistory(text){
				this.searchText = text
				this.searchEvent()
			},
			// 搜索事件
			searchEvent(){
				// 收起键盘
				uni.hideKeyboard()
				// 处于load状态
				uni.showLoading({
					mask:true,
					title:'加载中...'
				})
				// 请求搜索
				setTimeout(()=> {
					// 隐藏登录
					uni.hideLoading()
				}, 3000);
			}
		}
	}
</script>

<style>

</style>
