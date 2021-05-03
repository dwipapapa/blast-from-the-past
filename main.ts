namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const WavyProjectile = SpriteKind.create()
    export const SpiralProjectile = SpriteKind.create()
    export const Bomb = SpriteKind.create()
    export const Exploding_Bomb = SpriteKind.create()
    export const Helping = SpriteKind.create()
}
/**
 * IDEAS:
 * 
 * - Change ship look w/ weapon X
 * 
 * - wavey V
 * 
 * - spiral V
 * 
 * - bombs V
 * 
 * - lazer
 * 
 * - homing missile
 * 
 * -
 */
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    nextWeapon()
    Ship_from_the_past.say(weapon_names[currentWeapon], 500)
})
function fire (Help_shoot: boolean) {
    currWeaponName = weapon_names[currentWeapon]
    ammoConsumed = 0
    ammo = weapon_ammos[currentWeapon]
    if (Help_shoot) {
        for (let value of sprites.allOfKind(SpriteKind.Helping)) {
            ammoConsumed = fireWeapon(value, true)
        }
    } else {
        ammoConsumed = fireWeapon(Ship_from_the_past, false)
    }
    ammo += 0 - ammoConsumed
    if (ammo <= 0) {
        weapon_ammos.removeAt(currentWeapon)
        weapon_names.removeAt(currentWeapon)
        currentWeapon = 0
    } else {
        weapon_ammos[currentWeapon] = ammo
    }
}
sprites.onOverlap(SpriteKind.WavyProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fire(false)
})
sprites.onOverlap(SpriteKind.Helping, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Math.percentChance(15)) {
        sprite.destroy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    otherSprite.destroy()
    addWeapon()
})
function addWeapon () {
    newWeapon = randint(1, 6)
    if (newWeapon == 1) {
        weapon_names.push("cone")
        weapon_ammos.push(50)
    } else if (newWeapon == 2) {
        weapon_names.push("wavy")
        weapon_ammos.push(20)
    } else if (newWeapon == 3) {
        weapon_names.push("spiral")
        weapon_ammos.push(10)
    } else if (newWeapon == 4) {
        weapon_names.push("quick")
        weapon_ammos.push(12)
    } else if (newWeapon == 5) {
        weapon_names.push("rapid")
        weapon_ammos.push(2)
    } else {
        weapon_names.push("bomb")
        weapon_ammos.push(15)
    }
}
sprites.onOverlap(SpriteKind.Exploding_Bomb, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemyHit(otherSprite)
})
function fireWeapon (Shooting: Sprite, Help_Shoot: boolean) {
    if (Help_Shoot) {
        projectile = sprites.createProjectileFromSprite(img`
            4 4 
            4 4 
            `, Shooting, 200, 0)
    } else {
        if (currWeaponName == "basic") {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, Shooting, 200, 0)
        } else if (currWeaponName == "cone") {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, Shooting, 200, -50)
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, Shooting, 200, 0)
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, Shooting, 200, 50)
            return 3
        } else if (currWeaponName == "wavy") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . 
                . . 4 4 . . 
                . 4 4 4 4 . 
                . 4 4 4 4 . 
                . . 4 4 . . 
                . . . . . . 
                `, Shooting, 100, 0)
            projectile.setKind(SpriteKind.WavyProjectile)
            projectile.lifespan = 2000
            return 1
        } else if (currWeaponName == "spiral") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . 
                . . 4 4 . . 
                . 4 4 4 4 . 
                . 4 4 4 4 . 
                . . 4 4 . . 
                . . . . . . 
                `, Shooting, 50, 0)
            projectile.setKind(SpriteKind.SpiralProjectile)
            projectile.lifespan = 2000
            return 1
        } else if (currWeaponName == "quick") {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, Shooting, 1000, 0)
            projectile.startEffect(effects.fire)
            return 1
        } else if (currWeaponName == "rapid") {
            rapid_speed = -50
            for (let index = 0; index < 40; index++) {
                rapid_speed += 5
                projectile = sprites.createProjectileFromSprite(img`
                    4 4 
                    4 4 
                    `, Shooting, 1000, rapid_speed * randint(0.5, 5))
                projectile.startEffect(effects.fire)
                pause(100)
            }
            return 1
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Shooting, 50, 0)
            projectile.setKind(SpriteKind.Bomb)
            return 1
        }
    }
    return 0
}
function nextWeapon () {
    currentWeapon = (currentWeapon + 1) % weapon_names.length
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (Math.percentChance(50)) {
        Power = sprites.create(img`
            . . . b b . . . 
            . . b b b b . . 
            . b b b b d d . 
            b b b b d d d d 
            b b b d d d d . 
            . b d d d d . . 
            . . d d d . . . 
            . . . d . . . . 
            `, SpriteKind.PowerUp)
        Power.x = sprite.x
        Power.y = sprite.y
    }
})
function enemyHit (enemy: Sprite) {
    enemy.destroy()
    info.changeScoreBy(1)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.SpiralProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
let enemyShip: Sprite = null
let Power: Sprite = null
let rapid_speed = 0
let projectile: Sprite = null
let newWeapon = 0
let ammo = 0
let ammoConsumed = 0
let currWeaponName = ""
let currentWeapon = 0
let weapon_ammos: number[] = []
let weapon_names: string[] = []
let Ship_from_the_past: Sprite = null
effects.starField.startScreenEffect()
info.setLife(10)
Ship_from_the_past = sprites.create(img`
    . 8 8 8 8 8 . . . 
    2 8 8 8 . . . . . 
    8 8 . . . . . . . 
    8 8 8 8 6 8 6 8 8 
    8 8 8 8 6 8 6 8 8 
    8 8 . . . . . . . 
    2 8 8 8 . . . . . 
    . 8 8 8 8 8 . . . 
    `, SpriteKind.Player)
let Helper = sprites.create(img`
    . c c . . . . . . 
    c d d c . . . . . 
    c d b c . . . . . 
    c c b c 6 c 6 c c 
    c c b c 6 c 6 c c 
    c d b c . . . . . 
    c d d c . . . . . 
    . c c . . . . . . 
    `, SpriteKind.Helping)
Helper.setPosition(20, 20)
animation.runMovementAnimation(
Helper,
animation.animationPresets(animation.bobbing),
1000,
true
)
Helper = sprites.create(img`
    . c c . . . . . . 
    c d d c . . . . . 
    c d b c . . . . . 
    c c b c 6 c 6 c c 
    c c b c 6 c 6 c c 
    c d b c . . . . . 
    c d d c . . . . . 
    . c c . . . . . . 
    `, SpriteKind.Helping)
Helper.setPosition(20, 100)
animation.runMovementAnimation(
Helper,
animation.animationPresets(animation.bobbing),
1000,
true
)
controller.moveSprite(Ship_from_the_past)
let enemySpawnRate = 2000
let enemySpeed = 50
Ship_from_the_past.setFlag(SpriteFlag.StayInScreen, true)
weapon_names = ["basic", "quick"]
weapon_ammos = [1, 3]
currentWeapon = 0
color.setPalette(
color.GrayScale
)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.WavyProjectile)) {
        value.y += Math.sin(value.lifespan * 0.01) * 5
    }
    for (let value of sprites.allOfKind(SpriteKind.SpiralProjectile)) {
        value.y += Math.sin(value.lifespan * 0.01) * 5
        value.x += Math.cos(value.lifespan * 0.01) * 5
    }
})
game.onUpdateInterval(5000, function () {
    enemySpeed += 5
    enemySpeed = Math.min(enemySpeed, 1000)
    enemySpawnRate += -100
    enemySpawnRate = Math.max(enemySpawnRate, 50)
})
game.onUpdateInterval(1000, function () {
    if (currWeaponName == "bomb") {
        for (let value of sprites.allOfKind(SpriteKind.Bomb)) {
            value.setKind(SpriteKind.Exploding_Bomb)
            animation.runImageAnimation(
            value,
            assets.animation`Boom_Bomb`,
            100,
            false
            )
            timer.after(1000, function () {
                value.destroy()
            })
        }
    }
})
game.onUpdateInterval(enemySpawnRate, function () {
    fire(true)
})
forever(function () {
    pause(enemySpawnRate)
    enemyShip = sprites.createProjectileFromSide([
    img`
        . . a 2 a a a . 
        . . . . . a a a 
        . . a a 6 2 a a 
        a a a 2 6 6 a a 
        . . a a 6 2 a a 
        . . . . . a a a 
        . . a 2 a a a . 
        `,
    img`
        . . . . . a a . 
        . c c a a a a a 
        . . c c a 2 c c 
        c c c 2 a a c c 
        . . c c a 2 c c 
        . c c a a a a a 
        . . . . . a a . 
        `,
    img`
        . c c c c c c . 
        . . . . 6 c c c 
        . . 2 a 3 2 2 2 
        2 2 a 8 8 8 8 8 
        . . 2 a 3 2 2 2 
        . . . . 6 c c c 
        . c c c c c c . 
        `,
    img`
        . . . c e e e . 
        . . 2 2 c c c e 
        . . . 2 2 2 c c 
        c 6 c c c c e c 
        . . . 2 2 2 c c 
        . . 2 2 c c c e 
        . . . c e e e . 
        `,
    img`
        c . . . . 6 6 . 
        . 6 . . c 7 7 7 
        . . c c c 2 2 2 
        c 6 2 2 2 6 6 6 
        . . c c c 2 2 2 
        . 6 . . c 7 7 7 
        c . . . . 6 6 . 
        `,
    img`
        . . 6 6 6 6 e . 
        . . . 8 8 e e e 
        . 2 2 e 8 8 e e 
        2 2 e 2 6 6 e e 
        . 2 2 e 8 8 e e 
        . . . 8 8 e e e 
        . . 6 6 6 6 e . 
        `,
    img`
        . . . c 5 5 . . 
        . . c c c c 5 5 
        2 c 2 4 4 4 2 5 
        . . 4 4 4 4 4 5 
        2 c 2 4 4 4 2 5 
        . . c c c c 5 5 
        . . . c 5 5 . . 
        `
    ]._pickRandom(), 0 - enemySpeed, 0)
    enemyShip.y = randint(4, scene.screenHeight() - 4)
    enemyShip.setKind(SpriteKind.Enemy)
})
