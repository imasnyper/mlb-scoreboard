import React, { useRef, useEffect } from 'react'
import useCanvas from '../hooks/canvasHook'

const Canvas = props => {
    const { predraw, draw, postdraw, options, ...rest } = props
    const { context, ...moreConfig } = options
    const canvasRef = useCanvas(predraw, draw, postdraw, {context})

    return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas