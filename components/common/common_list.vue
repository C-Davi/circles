<template>
	<view class="p-2">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center rounded-circle" >
				<image class="mr-2" 
				:src="item.userpic" @click="openSpace"
				style="width: 65rpx;height: 65rpx;" 
				lazy-load="true"></image>
				<view>
					<view class="font" style="line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted" style="line-height: 1.5;">{{item.newstime}}</text>
				</view>
			</view>
			<view class="flex align-center justify-center rounded bg-main text-white animated faster" 
			@click="follow" v-if="!item.isFollow"
			style="width: 90rpx;height: 50rpx;"
			hover-class="jello">
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">
			{{item.title}}
		</view>
		<!-- 图片 -->
		<image class="rounded w-100" v-if="item.titlepic" @click="openDetail" :src="item.titlepic" style="height: 350rpx;"></image>
		<!-- 按钮 -->
		<view class="flex align-center" >
			<view class="flex align-center justify-center flex-1 animated faster " 
			hover-class="jello text-main" @click="doSupport('support')"
			:class="item.support.type === 'support'?'support-active':''">
				<text class="iconfont icon-dianzan2 mr-2" ></text>
				<text>{{item.support.support_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster"
			 hover-class="jello text-main" @click="doSupport('unsupport')"
			 :class="item.support.type === 'unsupport'?'support-active':''">
				<text class="iconfont icon-cai mr-2" ></text>
				<text>{{item.support.unsupport_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" 
			hover-class="jello text-main" @click="openDetail">
				<text class="iconfont icon-pinglun2 mr-2" ></text>
				<text>{{item.comment_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" 
			hover-class="jello text-main" @click="openDetail">
				<text class="iconfont icon-fenxiang mr-2" ></text>
				<text>{{item.share_num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		},
		methods:{
			// 打开个人空间
			openSpace(){
				console.log(1)
			},
			// 关注
			follow(){
				// 通知父组件
				this.$emit('follow',this.index)
				console.log(2)
			},
			//进入详情页
			openDetail(){
				console.log(3)
			},
			// 顶踩操作
			doSupport(type){
				// 通知父组件
				this.$emit('doSupport',{
					type:type,
					index:this.index
				})
			}
		}
	}
</script>

<style>
	.support-active{
		color: #FF4A6A;
	}
</style>
