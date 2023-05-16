<script setup>
import data from './assets/MOCK_DATA-2.json'
import { ref } from 'vue'
import TableComponent from './components/table/TableComponent.vue'
import CardComponent from './components/card/CardComponent.vue'
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.vue'
import DropdownComponent from './components/dropdown/DropdownComponent.vue'
import ActionDropdownComponent from './components/dropdown/ActionDropdownComponent.vue'
import ModalComponent from './components/modal/ModalComponent.vue'
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// const items = await delay(2000).tehn(() => ref([...data]))
const items = ref([...data])
const fields = ref([
    {
        key: 'id',
        thClassList: 'tw-text-right tw-px-1 tw-w-18',
        tdClassList: 'tw-text-right tw-px-1 tw-font-mono',
        tdTopRowClassList: 'tw-text-right tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold'
    },
    {
        key: 'first_name',
        thClassList: 'tw-text-left tw-px-1',
        tdClassList: 'tw-text-left tw-px-1',
        tdTopRowClassList: 'tw-text-left tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold'
    },
    {
        key: 'last_name',
        thClassList: 'tw-text-left tw-px-1',
        tdClassList: 'tw-text-left tw-px-1',
        tdTopRowClassList: 'tw-text-left tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold'
    },
    {
        key: 'email',
        thClassList: 'tw-text-left tw-px-1',
        tdClassList: 'tw-text-left tw-px-1 tw-w-15',
        tdTopRowClassList: 'tw-text-left tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold'
    },
    {
        key: 'share',
        thClassList: 'tw-text-right tw-px-1 tw-w-15',
        tdClassList: 'tw-text-right tw-px-1 tw-font-mono tw-w-15',
        tdTopRowClassList: 'tw-text-right tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold',
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
        thClassList: 'tw-text-right tw-px-1 tw-w-45',
        tdClassList: 'tw-text-right tw-px-1 tw-font-mono',
        tdTopRowClassList: 'tw-text-right tw-px-1 tw-italic',
        tdBottomRowClassList: 'tw-text-right tw-px-1 tw-font-semibold'
    }
])
const tableStatus = ref({ busy: false })

const logItem = item => {
    console.log(item)
}
const test = () => console.log('test')
const stopped = () => console.log('stopped')
const opened = () => console.log('opened')
</script>

<template>
    <div class="tw-p-5">
        <modal-component title="A Dialog Title" toggle-type="button" @confirmed="test" @cancelled="stopped" @opened="opened">
            <template #content>
                <p class="tw-pt-2 tw-text-gray-600 tw-px-4">...and some text to show</p>
            </template>
        </modal-component>
        <div class="tw-p-[8rem]"></div>
        <action-dropdown-component :options="['a', 'b']" @on-select="logItem">
            <template #toggle-label>
                <div>select action</div>
            </template>
        </action-dropdown-component>
        <dropdown-component :options="['a', 'b']">
            <template #toggle-label>
                <div>select</div>
            </template>
        </dropdown-component>
        <card-component class="tw-mt-5">
            <loading-overlay :show="tableStatus.busy">
                <table-component :items="items" :fields="fields" title="Test" class="tw-w-[100%]">
                    <template #table-top-controls>
                        <div class="tw-border tw-px-4 tw-ms-auto">some control</div>
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
