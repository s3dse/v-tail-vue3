# v-tail-vue3
A component library for Vue 3 using Tailwind CSS.
## Installation

Install the library via `npm install --save @s3_dse/v-tail-vue3`.

Add the following to your entry point (e.g. `main.js`):
```js
import VTail from '@s3_dse/v-tail-vue3'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(VTail)

app.mount('#app')
```
# Components
## Table Component
A table that supports
* filtering
* pagination
* custom column and cell rendering
* fixed top row(s) (e.g. for comparisons)
* fixed bottom row(s) (e.g. for summaries)

## Usage
We will use the following lines to illustrate the usage of the table component:
```html
<template>
    <table-component
        title="A Table"
        :items="data"
        :top-rows="topRows"
        :bottom-rows="summaryRows"
        :fields="header"
        :paginate="true"
        :configurablePageSize="true"
        :per-page="5"
        @after-sort="afterSort"
        @after-page-change="afterPageChange"
        @after-filter="afterFilter"
        :pagination-previous-label="'<'"
        :pagination-next-label="'>'"
    >
        <template #cell(ip_address)="{ value }">
            <p class="text-navy-500">{{ value }}</p>
        </template>
        <template #pagination-label="{ perPage, currentPage, totalEntries }">
            I am currently showing entries 
            {{ perPage * currentPage - perPage + 1 }} to
            {{ perPage * currentPage }} of {{ totalEntries }} entries.
        </template>
        <template #page-size-label="data">
            Current Page Size: {{ data.pageSize }}
        </template>
    </table-component>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            data: [
                { id: 1, name: 'John Doe', share: 0.51, ip_address: '111.222.47.186', last_login: '2023-01-31' },
                { id: 2, name: 'Jane Doe', share: 0.08, ip_address: '71.190.227.13', last_login: '2023-04-10' }
            ],
            topRows: [
                { id: 3, name: 'Patricia Smith', share: 0.89, ip_address: '25.7.58.72', last_login: '2023-04-10'},
                { id: 4, name: 'Douglas Holland', share: 0.72, ip_address: '105.171.14.146', last_login: '2023-03-24'}
            ],
            bottomRows: [
                {id: 5, name: 'Jordan Winsley', share: 0.81, ip_address: '141.147.221.67', last_login: '2023-04-28'}
            ],
            fields: [
                { key: 'id' }, 
                { key: 'name' },
                { key: 'share',
                  thClassList: 'text-right px-2',
                  tdClassList: 'text-right px-2',
                  tdTopRowClassList: 'text-right px-2 italic',
                  tdBottomRowClassList: 'text-right px-2 font-semibold',
                  formatter: value =>
                          value
                              ? (parseFloat(value) * 100).toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2
                              }) + '%'
                              : ''
                }
                { key: 'ip_address',
                  thClassList: 'text-center px-2',
                  tdClassList: 'text-center px-2',
                  tdTopRowClassList: 'text-center px-2 italic',
                  tdBottomRowClassList: 'text-right px-2 font-semibold'
                }
            ]
        }
    }
}
</script>
<style>
@import '@s3_dse/v-tail-vue3/dist/style.css';
</style>
```

We pass the table data as an array of objects via the `:items` attribute. The same applies to the optional `:top-rows` and `:bottom-rows`. The entries of all three data arrays need to have the same structure. The `:fields` attribute takes an array of objects with details regarding the rendering of particular fields. Field entries have a `key` to refer to a data entry's property. The remaining field properties are metadata to customize the rendering of the column:
 * `thClassList`: classes for styling the column's `<th>` content (only applied to `:items` records)
 * `tdClassList`: classes for styling the column's `<td>` content (only applied to `:items` records)
 * `tdTopRowClassList`: classes for styling the column's `<td>` content (only applied to `:top-rows` records)
 * `tdBottomRowClassList`: classes for styling the column's `<td>` content (only applied to `:bottom-rows` records)
 * `formatter`: a function defining a formatting logic for the values of that field/column

Only those attributes present in the field array will be displayed in the resulting table.

### Pagination
The page navigation can be enabled/disabled via the `:paginate` attribute. This will toggle pagination in general. The page size configurator can be enabled/disabled via the `:configurable-page-size` attribute. Both these attributes take boolean values and are `true` by default. They are part of the above example only for illustration.

### Cell Rendering
The above example shows how to use the `#cell()` slot to customize the rendering of individual cells. The slot is dynamic and takes a field key as argument. It provides an object holding the actual cell `value`, the `item` (or record) of the `:items` array, and the `field` of the `:fields` array.

### Credits
The component is heavily inspired by the Bootstrap Vue Table component. Have a look: https://github.com/bootstrap-vue/bootstrap-vue

## Dialog Component (Radix Vue)

A component for displaying modal dialogs. 
### Usage

```html
<script setup>
...
const validateAndSubmit = () => {
    const selection = document.querySelector('.custom-select').selectedOptions[0].innerText
    if (selection === 'a') {
        console.log('Error: Option "a" is not allowed!')
        return false
    } else {
        console.log('success')
        submitLogic()
        return true

    }

}
</script>
<template>
    ...
    <dialog-component title="Testing Dialog" description="A dialog..." @cancel="test" :pre-confirm="validateAndSubmit">
        <template #content>
            <div class="flex gap-4 flex-col text-gray-900 dark:text-gray-100 px-4 pt-3 pb-5">
                <div>Some content</div>
            </div>
            <select class="custom-select"><option>a</option><option>b</option></select>
        </template>
    </dialog-component>
</template>
```

#### Props
| Prop        | Description                                                                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| classes     | Object with styles keyed by component part. Optional. See styles.                                                                             |
| title       | The dialog title. Optional.                                                                                                                   |
| description | The dialog description. Optional.                                                                                                             |
| preConfirm  | The function to call before closing via confirmation (not cancellation). Returns `true` to continue confirmation, `false` to abort. Optional. |

#### Styling
The `classes` prop allows to modify the styling of the
* Dialog-Trigger
* Overlay
* Title
* Description
* Content Container.

E.g.
```js
<dialog-component :classes="{title: 'text-4xl text-green'}">
    ...
</dialog-component>
```

See the [default style map](/src/components/dialog/DialogComponent.vue#L15) for reference.

## Select Component (Radix Vue)
A component wrapping an HTML `select`.
### Usage
```html
<script setup>
import { ref } from 'vue'
import { SelectComponent } from '@/components'

const options = [
    { name: 'Record A', value: 'a' },
    { name: 'Record B', value: 'b' },
    { name: 'Record C', value: 'c' },
    { name: 'Record D', value: 'd' },
    { name: 'Record E', value: 'e' },
    { name: 'Record F', value: 'f' }
]

const selection = ref(options[0])
</script>
<template>
    <select-component
        v-model="selection"
        :options="options"
        label-key="name"
        aria-label="Select option"
    ></select-component>
    <div class="text-gray-900 dark:text-gray-100">{{ selection }}</div>
</template>

```

#### Props
| Prop        | Description                                                                                  |
|-------------|----------------------------------------------------------------------------------------------|
| classes     | Object with styles keyed by component part. Optional. See styles.                            |
| options     | Array of options (complex or primitive). Required.                                           |
| labelKey    | A key (String) to access the label property of an option. Optional.                          |
| placeholder | A placeholder (String) when there is no default selection given. Default: 'Select option'.   |
| modelValue  | The value (String\|Boolean\|Number\|Object) holding the currently selected option. Optional. |

#### Styling
The trigger widget is styled via plain HTML attributes on the component. Additionally, the `classes` prop allows to modify the styling of the
* trigger
* content container
* item.

E.g.

```html
<select-component
        v-model="selection"
        :options="options"
        label-key="name"
        aria-label="Select option"
        class="w-full"
        :classes="{trigger: 'bg-green-400'}"
    ></select-component>
```

## ListSelect Component (Alpha)
### Usage

```html
<script setup>
...
const listSelectOptions = [...new Array(99999).keys()].map(k => ({ id: k+1, name: `option ${k+1}` }))
const listSelection = ref([])
</script>
<div class="pl-8">
    <list-select
        class="w-fit"
        :options="listSelectOptions"
        :dropdownClasses="`right-0 min-w-50 w-fit`"
        :multiple="true"
        :label-fn="e => e.name"
        v-model="listSelection"
        @update:modelValue="e => console.log(e)"
        :truncate-items="true"
    ></list-select>
</div>
```


### Props
| Prop       | Type|Description|
|------------|-----|-----------|
|options     | Array of objects | The available options.  |
|modelValue (via `v-model`)|Array of objects| The selected options.|
|inputPlaceholder | String  | The placeholder on the filter input.|
|labelFn | Function | Retrieves the option label, default is `(option) => option.label` |
|trackBy | String | The name of the property that uniquely identifies an option and is used for sorting, default is `(option) => option.id`.|
|multiple| Boolean| The selection mode, i.e. switch between multiple selections and a single selection.|
|optionsLoading|Boolean|Used to indicate a loading process on the input.|
|inputClasses|String|Classes to apply to the input.|
|dropdownClasses|String|Classes to apply to the dropdown container.|
|optionSize|Integer|The height of an option in pixels. Used to properly align options within the virtual scroll viewport|
|selectionTextFn|Function|Defines the how the selection text is build. Shown on the input and in the selection preview (when `multiple`).|
|maxSelectionLength|Integer|Defines how many options can be selected (when `multiple`)|
|maxSelectionLengthTextFn|Function|Defines how the warning text is build, when the selection length exceeds the limit. Default is ```(limit) => `You can only select ${limit} items.` ```|
|selectionExceededInfoDuration|Integer|Defines how long the warning text (`maxSelectionLengthTextFn`) is shown in milliseconds.|
|itemNameTextFn|Function|Used for pluralizing the name of options, e.g. ```(count) => (count !== 1 ? 'items' : 'item') ```.|
|searchFn|Function|Defines how the options shall be filtered based on the given search term. The default checks if the lower-cased search term is included in the lower cased option label (see `labelFn`).|
|dropDownZIndex|Integer|Customize the z-index of the dropdown container. Default value is `9999`.|
|dropDownWidth|String|Customize the width of the dropdown container. Default value is `'30rem'`.|
|truncateItems|Boolean|If `true`, option labels that exceed the dropdown width will be truncated with an ellipsis.|

### Events
| Name | Description|
|------|------------|
|update:modelValue| Indicates a change in the currently selected options.|

## Pagination Component
## Dropdown Component
# License
MIT License

Copyright (c) 2024 Sebastian Doerl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.