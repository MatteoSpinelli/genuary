class Oscillator {
    angle
    angleVelocity
    amplitude
    constructor(angle, amplitude, angleVelocity) {
        this.angle = angle ?? createVector(random(-0.5, 0.5), random(-0.5, 0.5))
        this.angleVelocity = angleVelocity ?? createVector(random(-0.05, 0.05), random(-0.05, 0.05))
        this.amplitude = amplitude ?? createVector(random(20, width / 2), random(20, height / 2))
    }

    update() {
        this.angle.add(this.angleVelocity)
    }

    show() {
        let x = sin(this.angle.x) * this.amplitude.x
        let y = sin(this.angle.y) * this.amplitude.y

        push()
        translate(width / 2, height / 2)
        stroke(0)
        fill(127)

        circle(x, y, 20)
        line(0, 0, x, y)
        pop()
    }
}