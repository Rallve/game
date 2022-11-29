import kaboom from "kaboom";

// Remember: npx esbuild

kaboom();

add([
    text("Lol"),
    pos(120, 180),
]);

loadSprite("guy", "sprites/guy.png")
loadSprite("sword", "sprites/sword.png")

const guy = add([
    sprite("guy"),
    pos(),
    area(),
    body(),
])

const sword = add([
    sprite("sword"),
    pos(mousePos, mousePos),
])

onKeyPress("space", () => {
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

add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
])

