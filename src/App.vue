<script setup>
import data from './assets/MOCK_DATA-2.json'
import { ref } from 'vue'
import TableComponent from './components/table/TableComponent.vue'
import CardComponent from './components/card/CardComponent.vue'
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.vue'
import DropdownComponent from './components/dropdown/DropdownComponent.vue'
import ActionDropdownComponent from './components/dropdown/ActionDropdownComponent.vue'
import ModalComponent from './components/modal/ModalComponent.vue'
import DialogComponent from './components/dialog/DialogComponent.vue'
import SelectComponentExample from './components/select/SelectComponentExample.vue'
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
</script>

<template>
    <div class="un-p-5">
        <select-component-example></select-component-example>
        <!-- <select-component
            :options="selectOptions"
            label-key="name"
            :default-index="0"
            class="un-w-full"
            :classes="{ trigger: 'un-bg-green-500' }"
            v-model="selected"
        >
            <template #trigger>
                <div class="un-flex un-gap-2 un-items-center un-px-2">
                    <span class="i-tabler-chevron-down block text-base"></span>
                </div>
            </template>
        </select-component>
        <div>{{ selected }}</div> -->

        <dialog-component
            title="Testing Dialog"
            description="A dialog..."
            @cancel="test"
            :pre-confirm="validateAndSubmit"
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
    </div>
</template>
