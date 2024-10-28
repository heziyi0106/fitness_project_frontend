<template>
    <div class="body-composition container">
        <h2>身體組成資料</h2>
        <div class="row">
            <div class="col-12 col-md-6">
                <p><strong>年齡:</strong> {{ age }} 歲</p>
            </div>
            <div class="col-12 col-md-6">
                <p><strong>身高:</strong> {{ height }} cm</p>
            </div>
            <div class="col-12 col-md-6">
                <p><strong>體重:</strong> {{ weight }} kg</p>
            </div>
            <div class="col-12 col-md-6">
                <p><strong>體脂肪:</strong> {{ bodyFat }} %</p>
            </div>
            <div class="col-12 col-md-6">
                <p><strong>體圍度:</strong> {{ bodyMeasurements }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BodyComposition',
    data() {
        return {
            age: 30,               // 假設預設數值，將來可以動態賦值
            height: 175,
            weight: 70,
            bodyFat: 18,
            bodyMeasurements: '胸圍: 100cm, 腰圍: 80cm, 臀圍: 90cm' // 假設數值
        };
    }
}
</script>

<style scoped>
.body-composition {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #f8f9fa;
}
</style>
