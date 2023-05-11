<script setup>
import data from './assets/MOCK_DATA-2.json'
import { ref } from 'vue'
import './assets/main.css'
import TableComponent from './components/table/TableComponent.vue'
import CardComponent from './components/card/CardComponent.vue'
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.vue'
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// const items = await delay(2000).tehn(() => ref([...data]))
const items = ref([...data])
const fields = ref([
  {
    key: 'id',
    thClassList: 'tw-text-right tw-px-2',
    tdClassList: 'tw-text-right tw-px-2',
    tdTopRowClassList: 'tw-text-right tw-px-2 tw-italic',
    tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold'
  },
  {
    key: 'first_name',
        thClassList: 'tw-text-left tw-px-2',
        tdClassList: 'tw-text-left tw-px-2',
        tdTopRowClassList: 'tw-text-left tw-px-2 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold'
      },
      {
        key: 'last_name',
        thClassList: 'tw-text-left tw-px-2',
        tdClassList: 'tw-text-left tw-px-2',
        tdTopRowClassList: 'tw-text-left tw-px-2 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold'
      },
      {
        key: 'email',
        thClassList: 'tw-text-left tw-px-2',
        tdClassList: 'tw-text-left tw-px-2',
        tdTopRowClassList: 'tw-text-left tw-px-2 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold'
      },
      {
        key: 'share',
        thClassList: 'tw-text-right tw-px-2',
        tdClassList: 'tw-text-right tw-px-2',
        tdTopRowClassList: 'tw-text-right tw-px-2 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold',
        formatter: number =>
        number
        ? (parseFloat(number) * 100).toLocaleString(navigator.language, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }) + '%'
        : number
      },
      {
        key: 'ip_address',
        thClassList: 'tw-text-center tw-px-2',
        tdClassList: 'tw-text-center tw-px-2',
        tdTopRowClassList: 'tw-text-center tw-px-2 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-2 tw-font-semibold'
      }
    ])
const tableStatus = ref({ busy: false})
</script>

<template>
    <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
    <div>
        <card-component class="tw-p-1">
            <loading-overlay :show="tableStatus.busy">
                <table-component :items="items" :fields="fields" title="Test">
                  <template #table-top-controls>
                    <div class="tw-border tw-px-4">some control</div>
                  </template>
                  <template #page-size-label="{pageSize}">
                    Einträge pro Seite: {{ pageSize }}
                  </template>
                </table-component>
            </loading-overlay>
        </card-component>
    </div>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
