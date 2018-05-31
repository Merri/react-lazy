// based on @researchgate/react-intersection-observer
import { parseRootMargin, shallowCompareOptions } from './utils'

export const storage = new Map()

export function findObserverElement(observer, entry) {
    const observerElements = storage.get(observer)

    if (observerElements) {
        const elements = observerElements.values()

        for (let element = elements.next(); !element.done; element = elements.next()) {
            if (element.value.target === entry.target) {
                return element.value
            }
        }
    }

    return null
}

export function getPooled(options = {}) {
    const root = options.root || null
    const rootMargin = parseRootMargin(options.rootMargin)
    const threshold = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold != null ? options.threshold : 0]

    const observers = storage.keys()

    for (let observer = observers.next(); !observer.done; observer = observers.next()) {
        const unmatched =
            shallowCompareOptions(root, observer.value.root) ||
            shallowCompareOptions(rootMargin, observer.value.rootMargin) ||
            shallowCompareOptions(threshold, observer.value.threshold)

        if (!unmatched) {
            return observer.value
        }
    }

    return null
}

/**
 * The Intersection Observer API callback that is called whenever one element,
 * called the target, intersects either the device viewport or a specified element.
 * Also will get called whenever the visibility of the target element changes and
 * crosses desired amounts of intersection with the viewport element.
 * @param {array} changes
 * @param {IntersectionObserver} observer
 */
export function callback(changes, observer) {
    for (let i = 0; i < changes.length; i++) {
        const instance = findObserverElement(observer, changes[i])

        if (instance) {
            instance.handleChange(changes[i])
        }
    }
}

export function createObserver(options) {
    return getPooled(options) || new IntersectionObserver(callback, options)
}

export function observeElement(element) {
    if (!storage.has(element.observer)) {
        storage.set(element.observer, new Set())
    }

    storage.get(element.observer).add(element)
    element.observer.observe(element.target)
}

export function unobserveElement(element) {
    if (storage.has(element.observer)) {
        const targets = storage.get(element.observer)

        if (targets.delete(element)) {
            if (targets.size > 0) {
                element.observer.unobserve(element.target)
            } else {
                element.observer.disconnect()
                storage.delete(element.observer)
            }
        }
    }
}
