<template>
    <div id="body-composition">
        <h2>身體組成資料</h2>
        <p>年齡: {{ user.age }} 歲</p>
        <p>身高: {{ user.height }} 公分</p>
        <p>體重: {{ user.weight }} 公斤</p>
        <p>體脂肪: {{ user.body_fat }}%</p>
        <p>體圍: {{ user.body_measurements }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                age: 25,
                height: 175,
                weight: 70,
                body_fat: 15,
                body_measurements: '胸圍 90cm, 腰圍 75cm, 臀圍 95cm'
            }
        };
    }
};
</script>
