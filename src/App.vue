<script setup>
import data from './assets/MOCK_DATA-2.json'
import { computed, ref } from 'vue'
import TableComponent from './components/table/TableComponent.vue'
import CardComponent from './components/card/CardComponent.vue'
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.vue'
import DropdownComponent from './components/dropdown/DropdownComponent.vue'
import ActionDropdownComponent from './components/dropdown/ActionDropdownComponent.vue'
import ModalComponent from './components/modal/ModalComponent.vue'
import DialogComponent from './components/dialog/DialogComponent.vue'
import SelectComponentExample from './components/select/SelectComponentExample.vue'
import TabCardComponent from './components/card/TabCardComponent.vue'
import TestOne from './components/card/TestOne.vue'
import TestTwo from './components/card/TestTwo.vue'
import ListSelect from './components/listselect/ListSelect.vue'
import { joinLines } from './utils/string-join-lines'

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// const items = await delay(2000).tehn(() => ref([...data]))
const items = ref([...data])
const topRows = ref([...data].slice(0, 5))
const fields = ref([
    {
        key: 'id',
        thClassList: 'un-text-right un-px-1 un-w-18',
        tdClassList: 'un-text-right un-px-1 un-font-mono',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'first_name',
        label: 'the first name',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'last_name',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'email',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1 un-w-15',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'share',
        thClassList: 'un-text-right un-px-1 un-w-15',
        tdClassList: 'un-text-right un-px-1 un-font-mono un-w-15',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold',
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
        thClassList: 'un-text-right un-px-1 un-w-45',
        tdClassList: 'un-text-right un-px-1 un-font-mono',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    }
])
const tableStatus = ref({ busy: false })

const logItem = item => {
    console.log(item)
}
const test = () => console.log('test')
const stopped = () => console.log('stopped')
const opened = () => console.log('opened')
const validateAndSubmit = () => {
    const selection = document.querySelector('.custom-select').selectedOptions[0].innerText
    if (selection === 'a') {
        console.log('error')
        return false
    } else {
        console.log('success')
        return true
    }
}
const panelClassList = joinLines(`un-w-full 
                            un-max-w-md 
                            un-overflow-hidden 
                            un-bg-white 
                            un-rounded-lg
                            un-text-left 
                            un-align-middle 
                            un-shadow-xl`)

const selectOptions = [
    { name: 'Record A', value: 'a' },
    { name: 'Record B', value: 'b' },
    { name: 'Record C', value: 'c' },
    { name: 'Record D', value: 'd' },
    { name: 'Record E', value: 'e' },
    { name: 'Record F', value: 'f' }
]
const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const selected = ref(selectOptions[0])
const isLoading = ref(true)

const tab1 = { id: 'a', label: 'First Tab', component: TestOne, props: { message: 'testOne ' } }
const tab2 = { id: 'b', label: 'Second Tab', component: TestTwo, props: { message: 'testTwo ' } }
const tabs = [tab1, tab2]

const listSelectOptions = [...new Array(100000).keys()].map(k => ({ id: k, name: `option ${k}` }))
const filterText = ref('')
const listSelectOptionsFiltered = computed(() =>
    filterText.value
        ? listSelectOptions.filter(item =>
              item.label.toLowerCase().includes(filterText.value.toLowerCase())
          )
        : listSelectOptions
)

const listSelection = ref([])
</script>

<template>
    <button class="un-text-gray-900 dark:un-text-gray-100" @click="isLoading = !isLoading">
        Loading {{ isLoading }}
    </button>
    <div
        v-busy="isLoading"
        class="un-py-3 un-border un-rounded un-border-solid un-border-gray-200 dark:un-border-moon-700"
    >
        <p class="un-text-gray-900 dark:un-text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dolore.
        </p>
    </div>
    <loading-overlay
        :show="isLoading"
        class="un-py-3 un-border un-rounded un-border-solid un-border-gray-200 dark:un-border-moon-700"
    >
        <p class="un-text-gray-900 dark:un-text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dolore.
        </p>
    </loading-overlay>
    <div class="un-flex un-px-50">
        <action-dropdown-component
            :options="['a', 'b']"
            up-icon=""
            down-icon=""
            @on-select="logItem"
            class="un-px-10 un-ms-auto un-me-2 un-h-full un-rounded-sm hover:un-cursor-pointer"
        >
            <template #toggle-label>
                <div class="i-tabler-menu-2"></div>
            </template>
        </action-dropdown-component>
    </div>
    <!-- <div class="un-p-5">
        <select-component-example></select-component-example>
      

        <dialog-component
            title="Testing Dialog"
            description="A dialog..."
            @cancel="test"
            :pre-confirm="validateAndSubmit"
            :confirm-disabled="true"
        >
            <template #content>
                <div
                    class="un-flex un-gap-4 un-flex-col un-text-gray-900 dark:un-text-gray-100 un-px-4 un-pt-3 un-pb-5"
                >
                    <span>test</span>
                    <span>another test</span>
                    <span>and another test</span>
                </div>
                <select class="custom-select">
                    <option>a</option>
                    <option>b</option>
                </select>
            </template>
        </dialog-component>
        <modal-component
            title="A Dialog Title"
            toggle-type="button"
            @confirmed="test"
            @cancelled="stopped"
            @opened="opened"
            :dialog-panel-class-list="panelClassList"
        >
            <template #content>
                <p class="un-pt-2 un-text-gray-600 un-px-4">...and some text to show</p>
            </template>
        </modal-component>
        <div class="un-p-[8rem]"></div>
        <action-dropdown-component :options="['a', 'b']" @on-select="logItem" class="un-w-fit">
            <template #toggle-label>
                <div>select action</div>
            </template>
        </action-dropdown-component>
        <dropdown-component :options="['a', 'b']" class="un-w-fit">
            <template #toggle-label>
                <div>select</div>
            </template>
        </dropdown-component>
        <card-component class="un-mt-5">
            <loading-overlay :show="tableStatus.busy">
                <table-component
                    :items="items"
                    :fields="fields"
                    :top-rows="topRows"
                    title="Test"
                    class="un-w-[100%] dark:un-bg-moon-800"
                >
                    <template #table-top-controls>
                        <div
                            class="un-border dark:un-border-moon-700 dark:un-text-gray-100 un-px-4 un-ms-auto"
                        >
                            some control
                        </div>
                    </template>
                    <template #page-size-label="{ pageSize }">
                        Einträge pro Seite: {{ pageSize }}
                    </template>
                    <template #cell(share)="data">
                        <div :title="data.unformatted">
                            {{ data.value }}
                        </div>
                    </template>
                </table-component>
            </loading-overlay>
        </card-component>
    </div>  -->
    <div class="un-py-12 un-text-gray-900 dark:un-text-gray-100">give me some space...</div>
    <div class="un-p-3">
        <tab-card-component :tabs="tabs" :current-tab-index="0"></tab-card-component>
    </div>
    <!-- <card-component class="un-mt-5">
        <loading-overlay :show="tableStatus.busy">
            <table-component
                :items="items"
                :fields="fields"
                :top-rows="topRows"
                title="Test"
                class="un-w-[100%] dark:un-bg-moon-800"
            >
                <template #table-top-controls>
                    <div
                        class="un-border dark:un-border-moon-700 dark:un-text-gray-100 un-px-4 un-ms-auto"
                    >
                        some control
                    </div>
                </template>
                <template #page-size-label="{ pageSize }">
                    Einträge pro Seite: {{ pageSize }}
                </template>
                <template #cell(share)="data">
                    <div :title="data.unformatted">
                        {{ data.value }}
                    </div>
                </template>
            </table-component>
        </loading-overlay>
    </card-component> -->
    <div class="un-p-8 un-text-gray-900 dark:un-text-gray-100">Some text above.</div>
    <list-select
        class="un-pl-5 un-w-100"
        :options="listSelectOptions"
        :dropdownClasses="`un-right-0 un-min-w-50 un-w-fit`"
        :multiple="true"
        :label-fn="e => e.name"
        v-model:selection="listSelection"
        @update:selection="e => console.log(e)"
    ></list-select>
    <div class="un-p-8 un-text-gray-900 dark:un-text-gray-100">Some text below.</div>
</template>
