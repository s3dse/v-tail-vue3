// @unocss-include

const busyClasses = ['busy-text-navy-500', 'busy-bg-slate-50', 'dark:busy-text-navy-200', 'dark:busy-bg-slate-900', 'z-0']
export const busy = (el, binding) => {
    if (binding.value) {
        el.dataset.busy = true
        el.classList.add(...busyClasses)

    } else {
        el.dataset.busy = false
        busyClasses.forEach(cls => el.classList.remove(cls))
    }
}
