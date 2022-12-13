import kaboom from "kaboom";
import { Sound } from "phaser";

// Remember: npx esbuild

kaboom({
    background:[60, 200, 30]
})

//------------------SPRITE LOADING--------------------------------------------
loadSprite("crosshair", "sprites/crosshair.png")
loadSprite("bullet", "sprites/bullet.png")
loadSprite("slime", "sprites/slime.png")
loadSprite("player", "sprites/player.png")
loadSprite("m4", "sprites/M4.png")

loadSound("gunshot", "sounds/gunshot.mp3")

volume(0.1)
//----------------------------------------------------------------------------

//-----------------------WORLD BUILDING--------------------------------------------
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
//--------------------------------------------------------------------------------------

//-------------------GAME OBJECT DECLARATION---------------------------------------
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
    health(1),
])

const slime = add([
    sprite("slime"),
    origin("center"),
    pos(150, 150),
    area({scale:0.5}),
    solid(),
    scale(0.8),
    rotate(),
    z(100),
    color(),
    "slime",
])

const hitbox = add([
    pos(80, 120),
    rect(80, 80),
    area(),
    origin("center"),
    follow(slime),
    opacity(0),
    health(100)
])

const crosshair = add([
    sprite("crosshair"),
    pos(),
    origin("center"),
    onUpdate(() => {
        crosshair.moveTo(mousePos().x, mousePos().y)
    })
])
//-----------------------------------------------------------------------

//----------------------------MOVEMENT SCRIPTS----------------------------------
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

onUpdate(() => {
    slime.move(player.pos.sub(slime.pos).unit().scale(400))
})
//-------------------------------------------------------------------------------

//--------------------------COMBAT SCRIPTS----------------------------------------
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
            "bullet",
            onCollide("slime", () => {
                console.log("hi")
            }),
        ])
        wait(0.1, () => canShoot = 1)
    }
})
//----------------------------------------------------------------------------------

//--------------------------------HEALTH SCRIPTS-----------------------------------
player.onCollide("slime", () => {
    player.hurt(1)
})

player.onDeath(() => {
    player.destroy()
    m4.destroy()
})

hitbox.onCollide("bullet", () => {
    hitbox.hurt(5)
    slime.move(player.pos.sub(slime.pos).unit().scale(-800))
    slime.color = rgb(255, 50, 50)
    wait(0.1, () => slime.color = rgb(255, 255, 255))
    
})

hitbox.onDeath(() => {
    slime.destroy()
})
//------------------------------------------------------------------------------------

//---------------------------------MISCELLANEOUS----------------------------------------
player.onUpdate(() => {
    player.angle = crosshair.pos.angle(player.pos)
    m4.angle = crosshair.pos.angle(m4.pos)
    m4.moveTo(player.pos.x - 31 * Math.sin(deg2rad(player.angle)), player.pos.y + 31 * Math.cos(deg2rad(player.angle)))
})
//-----------------------------------------------------------------------------------------