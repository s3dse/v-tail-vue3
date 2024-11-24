// @unocss-include

const busyClasses = ['busy-text-primary', 'busy-bg-slate-50', 'dark:busy-bg-slate-900']
export const busy = (el, binding) => {
    if (binding.value) {
        el.dataset.busy = true
        el.classList.add(...busyClasses)

    } else {
        el.dataset.busy = false
        busyClasses.forEach(cls => el.classList.remove(cls))
    }
}
