import { useRef, useEffect } from 'react'

const useCanvas = (predraw, draw, postdraw, options={}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext(options.context || '2d')
        const frameCountObject = {frameCount: 0}
        let animationFrameId

        const render = (frameCount) => {
            predraw(context, canvas)
            draw(context, frameCountObject)
            postdraw(context, frameCountObject)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render(frameCountObject)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}

export default useCanvas