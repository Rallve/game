import kaboom from "kaboom";

// Remember: npx esbuild

kaboom({
    background:[190, 190, 255]
})

add([
    text("Lol"),
    pos(120, 180),
])

loadSprite("guy", "sprites/guy.png")
loadSprite("crosshair", "sprites/crosshair.png")
loadSprite("bullet", "sprites/bullet.png")

const guy = add([
    sprite("guy"),
    pos(),
    area(),
    body(),
])

const crosshair = add([
    sprite("crosshair"),
    pos(),
    onUpdate(() => {
        crosshair.moveTo(mousePos().x - 30, mousePos().y - 30)
    })
])

onKeyPress("w", () => {
    if (guy.isGrounded()) {
        guy.jump(800)
    }
})

onKeyDown("d", () => {
    guy.move(400, 0)
})

onKeyDown("a", () => {
    guy.move(-400, 0)
})

let canShoot = 1

onMouseDown(() => {
    if (canShoot == 1) {
        canShoot = 0;
        const bullet = add([
            sprite("bullet"),
            area(),
            pos(guy.pos.x + 30, guy.pos.y + 30),
            rotate(crosshair.pos.angle(guy.pos)),
            move(crosshair.pos.angle(guy.pos), 3000),
            cleanup(),
        ])
        wait(0.1, () => canShoot = 1)
    }
})

//onUpdate(() => {
//    bullet.move(crosshair.pos.angle(guy.pos), 1000)
//})

mouseWorldPos.x, mouseWorldPos.y

add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(0, 200, 0),
])

