<template>
<div>
	<h1>Exercise List</h1>
	<ul>
		<li v-for="exercise in exercises" :key="exercise.id">
			{{ exercise.name }} - {{ exercise.goal }} - {{ exercise.total_duration }} mins
		</li>
	</ul>

	<h2>Create New Exercise</h2>
	<form @submit.prevent="createExercise">
	<input type="text" v-model="newExercise.name" placeholder="Exercise Name">
	
	<!-- 使用 select 元件來選擇運動目標 -->
	<select v-model="newExercise.goal">
		<option disabled value="">Select Goal</option>
		<option v-for="(goalLabel, goalValue) in goalChoices" :key="goalValue" :value="goalValue">
		{{ goalLabel }}
		</option>
	</select>

	<button type="submit">Create</button>
	</form>
</div>
</template>


<script>
import axios from 'axios'

export default {
data() {
	return {
		exercises: [],
		newExercise: {
			name: '',
			goal: ''  // 選中的運動目標
		},
		goalChoices: {
			muscle_gain: 'Muscle Gain',
			fat_loss: 'Fat Loss',
			endurance: 'Endurance',
			flexibility: 'Flexibility',
			general_fitness: 'General Fitness'
		}
	}
}
,
created() {
	this.fetchExercises();  // 組件創建時調用獲取數據的方法
},
methods: {
	fetchExercises() {
	axios.get('http://localhost:8000/fitness_api/exercises/')  // 發送GET請求
		.then(response => {
		this.exercises = response.data;  // 保存API返回的數據
		})
		.catch(error => {
		console.error('There was an error fetching the exercises!', error);
		});
	},
	createExercise() {
    axios.post('http://localhost:8000/fitness_api/exercises/', this.newExercise)
		.then(response => {
		this.exercises.push(response.data);  // 將新創建的運動添加到列表
		this.newExercise.name = '';  // 重置表單
		this.newExercise.goal = '';
		})
		.catch(error => {
		console.error('There was an error creating the exercise!', error);
		});
	}
}
}
</script>
