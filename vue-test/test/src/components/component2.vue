<template>
  <div class="search">
      <form @submit="getSearchItems" class="search__form">
          <input type="search" class="search__input" @input="getSearchItems" :autocomplete="inputAutocomplete" name="search_val" :placeholder="inputPlaceholder">
          <button class="search__button">{{buttonText}}</button>
      </form>
      <div class="search__count">
          <span class="search__count-text">Всего элементов: {{getItemsWithNamesList().length}}</span>
          <span class="search__count-text">Совпадений: {{coincidences}}</span>
      </div>
      <ul class="search__list">
          <li class="search__item"
            v-for="(item, index) in foundedItems"
            :key="index"
          >
            {{item.name}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'component2',
    data() {
        return {
            inputAutocomplete: 'off',
            inputPlaceholder: 'Поиск',
            buttonText: 'Искать!',
            coincidences: 0,
            foundedItems: [],
            items: [
                {
                    name: 'Витя',
                },
                {
                    name: 'Василий',
                },
                {
                    name: 'Бенедикт',
                },
                {
                    name: 'Марк',
                },
                {
                    name: 'Алексей',
                },
                {
                    name: 'Константин',
                },
            ],
        }
    },
    watch: {
        coincidences(){
            return this.coincidences;
        }
    },
    methods: {
        getSearchItems() {
            let targetForm = event.target;
            if(event.type == 'submit'){
                event.preventDefault();
            }
            else{
                targetForm = targetForm.parentNode;
            }
            

            const searchData = new FormData(targetForm);
            const searchRequest = searchData.get('search_val').toLowerCase();
            if(searchRequest.length == 0) return;
            
            if(event.type == 'submit'){
                targetForm.reset();
            }

            const foundedItems = this.items.filter(item => item.name.toLowerCase().indexOf(searchRequest) > -1);

            this.coincidences = foundedItems.length;
            this.foundedItems = foundedItems;
        },
        getItemsWithNamesList() {
            return this.items.filter(item => item.name);
        },
    }
}
</script>

<style lang="sass">
    .search
        &__input
            &:focus
                outline: none
        &__button
            cursor: pointer
        &__count
            margin-top: 5px
            font-size: 14px
            display: flex
            flex-direction: column
            align-items: flex-start
        &__list
            list-style-type: none
            margin: 0
            padding: 0
            margin-top: 10px
            li + li
                margin-top: 3px
</style>