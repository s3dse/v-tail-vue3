<script setup>
import data from './assets/MOCK_DATA-2.json'
import { ref } from 'vue'
import TableComponent from './components/table/TableComponent.vue'
import CardComponent from './components/card/CardComponent.vue'
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.vue'
import DropdownComponent from './components/dropdown/DropdownComponent.vue'
import ActionDropdownComponent from './components/dropdown/ActionDropdownComponent.vue'
import ModalComponent from './components/modal/ModalComponent.vue'
import { joinLines } from './utils/string-join-lines'
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// const items = await delay(2000).tehn(() => ref([...data]))
const items = ref([...data])
const topRows = ref([...data].slice(0,5))
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

const panelClassList = joinLines(`un-w-full 
                            un-max-w-md 
                            un-overflow-hidden 
                            un-bg-white 
                            un-rounded-lg
                            un-text-left 
                            un-align-middle 
                            un-shadow-xl`)
</script>

<template>
    <div class="un-p-5">
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
                <table-component :items="items" :fields="fields" :top-rows="topRows" title="Test" class="un-w-[100%] dark:un-bg-moon-800">
                    <template #table-top-controls>
                        <div class="un-border dark:un-border-moon-700 dark:un-text-gray-100 un-px-4 un-ms-auto">some control</div>
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
