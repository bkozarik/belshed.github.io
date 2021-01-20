<template>
    <div class="container">
    <div class="row image-transform">
        <div class="image-transform__wrap">
            <img :class="filters" src="https://static9.depositphotos.com/1594308/1110/i/600/depositphotos_11107478-stock-photo-fantasy.jpg" alt="Фотка" class="image-transform__img">
        </div>
        <div class="image-transform__controls">
            <div class="image-transform__block">
                <h2 class="image-transform__title">Фильтры</h2>
                <div class="row">
                    <button class="image-transform__btn" :class="filters.sepia ? 'active' : null" @click="filters.sepia = !filters.sepia">Сепия</button>
                    <button class="image-transform__btn" :class="filters.border ? 'active' : null" @click="filters.border = !filters.border">Рамка</button>
                    <button class="image-transform__btn" :class="filters.negative ? 'active' : null" @click="filters.negative = !filters.negative">Негатив</button>
                </div>
            </div>
            <div class="image-transform__block">
                <h2 class="image-transform__title">Размеры</h2>
            </div>
            <div class="image-transform__block">
                <h2 class="image-transform__title">Поворот</h2>
            </div>
            <div class="image-transform__block">
                <h2 class="image-transform__title">Отображение</h2>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'component3',
    data() {
        return {
            filters: {
                negative: false,
                border: false,
                sepia: false,
            },
        }
    },
}
</script>

<style lang="sass">
    .image-transform
        width: 100%
        &__wrap + &__controls
            margin-left: 30px
        &__wrap
            background-color: #fdfdfd
            position: relative
            padding-bottom: 30%
            width: 100%
            flex-basis: 50%
        &__img
            top: 0
            left: 0
            width: 100%
            height: 100%
            object-fit: cover
            position: absolute
            &.border
                box-shadow: 0 0 0 3px red
            &.negative
                filter: invert(100%)
            &.sepia
                filter: sepia(50%)
        &__block
            & + &
                margin-top: 20px
        &__title
            font-size: 22px
            margin-bottom: 10px
        &__btn
            background-color: #fff
            padding: 5px 10px
            border-radius: 3px
            border: 1px solid #dddddd
            cursor: pointer
            outline: none
            &.active
                background-color: #ddd
            & + &
                margin-left: 5px
</style>