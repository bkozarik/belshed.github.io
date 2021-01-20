<template>
    <label class="label">
        <span class="label__text">Количество единиц:</span>
        <div class="label__control">
            <button class="label__button" @click="decrement">-</button>
            <input class="label__input" :min="minValue" :max="maxValue" :value="val" @keydown="keydown($event.target.value)" @input="input($event.target.value)" type="text">
            <button class="label__button" @click="increment">+</button>
        </div>
    </label>
</template>

<script>
export default {
    name: 'component1',
    data() {
        return {
            val: 1,
            maxValue: 10,
            minValue: 1,
        }
    },
    methods: {
        constrain(val, min, max) {
            return val > max ? max : val < min ? min : val;
        },
        input(data) {
            data = parseInt(data.replace(/\D/g, ''));
            this.val = this.constrain(data, this.minValue, this.maxValue);
            event.target.value = this.val;
        },
        keydown(){
            if(/(Key)/g.test(event.code)){
                event.preventDefault();
            }
        },
        increment() {
            this.val = this.constrain(this.val + 1, this.minValue, this.maxValue);
        },
        decrement() {
            this.val = this.constrain(this.val - 1, this.minValue, this.maxValue);
        }
    }
}
</script>

<style>
    .label + .label {
        margin-top: 10px;
    }

    .label__text {
        display: inline-block;
        font-size: 14px;
        margin-bottom: 5px;
        user-select: none;
    }

    .label__control {
        display: flex;
        align-items: stretch;
    }

    .label__input {
        display: inline-block;
        max-width: 80px;
    }
</style>