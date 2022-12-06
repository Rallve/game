import kaboom from "kaboom";
import { Sound } from "phaser";

// Remember: npx esbuild

kaboom({
    background:[60, 200, 30]
})

add([
    text("Lol"),
    pos(120, 180),
])

loadSprite("crosshair", "sprites/crosshair.png")
loadSprite("bullet", "sprites/bullet.png")
loadSprite("slime", "sprites/slime.png")
loadSprite("player", "sprites/player.png")
loadSprite("m4", "sprites/M4.png")

loadSound("gunshot", "sounds/gunshot.mp3")

volume(0.1)

const m4 = add([
    sprite("m4"),
    origin("center"),
    pos(),
    scale(),
    rotate(),
    z(10),
])

const player = add([
    sprite("player"),
    origin("center"),
    pos(center()),
    area(),
    solid(),
    scale(0.5),
    rotate(),
    z(15),
])

player.onUpdate(() => {
    player.angle = crosshair.pos.angle(player.pos)
    m4.angle = crosshair.pos.angle(m4.pos)
    m4.moveTo(player.pos.x - 31 * Math.sin(deg2rad(player.angle)), player.pos.y + 31 * Math.cos(deg2rad(player.angle)))
})

/*
onKeyPress("f", () => {
    const slime = add([
        sprite("slime"),
        pos(),
        area(),
        body(),
        move(1000, 0),
    ])
})
*/
const crosshair = add([
    sprite("crosshair"),
    pos(),
    origin("center"),
    onUpdate(() => {
        crosshair.moveTo(mousePos().x, mousePos().y)
    })
])

onKeyDown("w", () => {
    player.move(0, -400)
})

onKeyDown("s", () => {
    player.move(0, 400)
})

onKeyDown("d", () => {
    player.move(400, 0)
})

onKeyDown("a", () => {
    player.move(-400, 0)
})

let canShoot = 1

onMouseDown(() => {
    if (canShoot == 1) {
        canShoot = 0;
        const bullet = add([
            sprite("bullet"),
            origin("center"),
            play("gunshot"),
            area(),
            pos(m4.pos.x, m4.pos.y),
            rotate(crosshair.pos.angle(m4.pos)),
            move(crosshair.pos.angle(m4.pos), 3000),
            cleanup(),
        ])
        wait(0.1, () => canShoot = 1)
    }
})

mouseWorldPos.x, mouseWorldPos.y

add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(100, 100, 100),
])

add([
    rect(width(), 48),
    pos(0, -10),
    outline(4),
    area(),
    solid(),
    color(100, 100, 100),
])

add([
    rect(48, height()),
    pos(-5, 0),
    outline(4),
    area(),
    solid(),
    color(100, 100, 100),
])

add([
    rect(48, height()),
    pos(width() - 40, 0),
    outline(4),
    area(),
    solid(),
    color(100, 100, 100),
])