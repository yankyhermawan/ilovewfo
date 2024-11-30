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