// based on @researchgate/react-intersection-observer
import { parseRootMargin, shallowCompareOptions } from '../lib/utils'

export const storage = new Map()

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

export default class ObserverContainer {
    static create(callback, options) {
        return getPooled(options) || new IntersectionObserver(callback, options)
    }

    static findElement(entry, observer) {
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

    static observe(element) {
        if (!storage.has(element.observer)) {
            storage.set(element.observer, new Set())
        }

        storage.get(element.observer).add(element)
        element.observer.observe(element.target)
    }

    static unobserve(element) {
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

    static clear() {
        storage.clear()
    }

    static count() {
        return storage.size
    }
}
