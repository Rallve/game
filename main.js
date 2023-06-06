import kaboom from "kaboom";
import { Sound } from "phaser";

// Remember: npx esbuild

kaboom({
    background:[60, 200, 30]
})

//------------------SPRITE LOADING--------------------------------------------

loadSprite("crosshair", "sprites/crosshair.png")
loadSprite("bullet", "sprites/bullet.png")
loadSprite("zombie", "sprites/zombie.png")
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

var score = 0;
var kills = 0;

const scoretxt = add([
    text("Time:")
])

const scoreText = add([
    text(score),
    pos(250, 0)
])

const killstxt = add([
    text("Kills:"),
    pos(0, 60)
])

const killsText = add([
    text(kills),
    pos(300, 60)
])

loop(1, () => {
    score++
    scoreText.text = score
})

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

const spawnPosX = [150, 900, 1500]
const spawnPosY = [150, 750]
var diff = 3

loop(2, () => {
    loop(diff, () => {
        const zombie = add([
            sprite("zombie"),
            origin("center"),
            pos(spawnPosX[Math.floor(Math.random() * 3)], spawnPosY[Math.floor(Math.random() * 2)]),
            area({scale:0.5}, {shape:"circle"}),
            solid(),
            scale(0.8),
            rotate(),
            z(100),
            color(),
            health(100),
            hp = 100,
            "zombie",
        ])
    })
    if (diff < 0.2) {
        diff -= 0.1
    }
})

onCollide("bullet", "zombie", (bullet, zombie) => {
    zombie.hurt(20)
    console.log(zombie.hp)
    bullet.destroy()
})
/*
add([
    pos(80, 120),
    rect(80, 80),
    area(),
    origin("center"),
    follow(zombie),
    opacity(0),
    health(100),
]),
*/

/*
const hitbox = add([
    pos(80, 120),
    rect(80, 80),
    area(),
    origin("center"),
    follow(zombie),
    opacity(0.5),
    health(100)
])
*/


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

onUpdate("zombie", (zombie) => {
    zombie.move(player.pos.sub(zombie.pos).unit().scale(400))
})


onCollide("bullet", "zombie", (bullet, zombie) => {
    zombie.destroy()
    kills++
    killsText.text = kills
})


/*
onUpdate("zombie", (m//(vad du vill att saken heter i koden)//) => {
        
    const dir = player.pos.sub(m.pos).sub(rand(vec2(70))).unit()
    m.move(dir.scale(300));
})
*/
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
            onCollide("zombie", () => {
                console.log("hi")
            }),
        ])
        wait(0.1, () => canShoot = 1)
    }
})

//----------------------------------------------------------------------------------

//--------------------------------HEALTH SCRIPTS-----------------------------------

player.onCollide("zombie", () => {
    player.hurt(1)
})

player.onDeath(() => {
    player.destroy()
    m4.destroy()
})
/*
zombie.onDeath(() => {
    zombie.destroy()
})
*/


/*
onCollide("bullet", "zombie", (zombie) => {
    zombie.hurt(5)
})
*/
/*
zombie.onCollide("bullet", () => {
    zombie.hurt(5)
    console.log(zombie.hp())
    //zombie.move(player.pos.sub(zombie.pos).unit().scale(-800))
    //zombie.color = rgb(255, 50, 50)
    //wait(0.1, () => zombie.color = rgb(255, 255, 255))
})

*/
/*
onUpdate("zombie", (zombie) => {

    zombie.onDeath(() => {
        zombie.destroy()
    })

    zombie.angle = player.pos.angle(zombie.pos)
})
*/
//------------------------------------------------------------------------------------

//---------------------------------MISCELLANEOUS----------------------------------------
player.onUpdate(() => {
    player.angle = crosshair.pos.angle(player.pos)

    m4.angle = crosshair.pos.angle(m4.pos)
    m4.moveTo(player.pos.x - 31 * Math.sin(deg2rad(player.angle)), player.pos.y + 31 * Math.cos(deg2rad(player.angle)))
})
//-----------------------------------------------------------------------------------------
