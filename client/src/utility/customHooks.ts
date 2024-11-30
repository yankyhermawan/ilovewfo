import React, { useRef, useEffect } from 'react'

export const useEffectAfterMount = (callback: React.EffectCallback, dependencies: React.DependencyList) => {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        callback()
    }, dependencies)
}

export const usePrevious = (value: number, defaultValue: number) => {
    const ref = useRef<number>(defaultValue)

    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}