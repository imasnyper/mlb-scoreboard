import GameScore from "./gameScore"
import Canvas from "./FieldCanvas"
import { useLocation, useSearchParams } from "react-router-dom"
import DiamondEmpty from "../images/diamond-empty.svg"
import DiamondFirst from "../images/diamond-first.svg"
import DiamondFirstSecond from "../images/diamond-first-second.svg"
import DiamondFirstThird from "../images/diamond-first-third.svg"
import DiamondFirstSecondThird from "../images/diamond-first-second-third.svg"
import DiamondSecond from "../images/diamond-second.svg"
import DiamondSecondThird from "../images/diamond-second-third.svg"
import DiamondThird from "../images/diamond-third.svg"
import { scheduleAtom } from "../atoms/scheduleAtom";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from 'react';

export default function Game() {
    const { state } = useLocation();
    const [diamondImage, setDiamondImage] = useState(DiamondEmpty)
    let games = useRecoilValue(scheduleAtom);
    const { gamePk } = state;
    const game = games.filter(game => game.gamePk === gamePk)[0]

    useEffect(() => {
        if (game.linescore !== undefined) {
            const { linescore } = game
            const { offense } = linescore
            let first = false, second = false, third = false
            if ('first' in offense) { first = true }
            if ('second' in offense) { second = true }
            if ('third' in offense) { third = true }
            
            if (first && second && third) { setDiamondImage(DiamondFirstSecondThird) }
            else if (first && second) { setDiamondImage(DiamondFirstSecond) }
            else if (first && third) { setDiamondImage(DiamondFirstThird) }
            else if (second && third) { setDiamondImage(DiamondSecondThird) }
            else if (first) { setDiamondImage(DiamondFirst) }
            else if (second) { setDiamondImage(DiamondSecond) }
            else if (third) { setDiamondImage(DiamondThird) }
        }
    }, [game])

    if (game.linescore === undefined) {
        return <GameScore game={game} />
    }

    const resizeCanvas = canvas => {
        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height
            context.scale(ratio, ratio)
            return true
        }

        return false
    }

    const predraw = (context, canvas) => {
        context.save()
        resizeCanvas(canvas)
        const { width, height } = canvas
        context.clearRect(0, 0, width, height)
    }

    const draw = (ctx, frameCountObject) => {
        const background = new Image()
        background.src = diamondImage
        ctx.drawImage(background, 0, 0)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(100, 100, 20*Math.sin(frameCountObject.frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    const postdraw = (ctx, frameCountObject) => {
        frameCountObject.frameCount++
        ctx.restore()
    }

    return <>
        <GameScore game={game} />
        <Canvas width={600} height={600} predraw={predraw} draw={draw} postdraw={postdraw} options={{'context': '2d'}} />
    </>
}