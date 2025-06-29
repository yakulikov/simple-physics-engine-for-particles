class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y

    }
}

class Particle {
    constructor(width, height, x, y) {
        this.represent = document.createElement('div');
        this.represent.style.width = `${width}px`;
        this.represent.style.height = `${height}px`;
        this.represent.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        this.represent.style.position = 'absolute';
        document.body.append(this.represent);

        this.useGravity = true;
        this.speedMultiplier = 12;
        this.a = 0.0024;
        this.b = Math.random() * (-1) - 0.7;
        this.c = y;
        this.shift = 0;
        this.jump = 0;
        this.speed = (Math.random() + 0.5) * this.speedMultiplier;
        this.position = new Vector(x, this.parabola(x, this.a, this.b));
        this.setPosition(this.position);
        this.gradient = 0;
        this.aInit = this.a;
        this.bounce = false;

        this.alive = setInterval(() => {
            this.tick();
        }, 20);
    }

    tick() {
        console.log(this.gradient * -1, this.b)
        this.gradient= 2 * this.a * this.position.x+ this.b
        if (Math.abs(this.speed) < 0.1) {
            document.body.removeChild(this.represent)
            return clearInterval(this.alive);
        } else if (this.position.y > 700 && !this.bounce) {
            this.bounce = true

            this.jump += 1;
            
            if (this.jump == 1){
                this.b = this.gradient * -1
            }
            this.shift = this.position.x;
            this.c = this.position.y;
            
            this.b *= 0.7;
            this.speed *= 0.7;

            this.a = this.aInit * this.speedMultiplier/Math.abs(this.speed)

        } else if(this.position.y > 700 && this.bounce){
            this.bounce = false

        } else if (this.position.x > 1500 || this.position.x < 0) {
            this.speed *= -1;
        } 

        this.position.x += this.speed;

        //  console.log(`b: ${this.b} x: ${this.position.x} y: ${this.position.y} shift: ${this.shift}, speed: ${this.speed}`);
        //  console.log(`${this.position.x - this.shift}, ${this.a}, ${this.b}, ${this.c}`);

        this.position.y = this.parabola(Math.abs(this.position.x - this.shift), this.a, this.b, this.c);
        this.setPosition(this.position);
    }

    setPosition(position) {
        this.represent.style.left = `${position.x}px`;
        this.represent.style.top = `${position.y}px`;
        this.position = position
    }

    move(position, speed) {
        let nextPos = new Vector((position.x - this.position.x) * speed + this.position.x, (position.y - this.position.y) * speed + this.position.y)
        this.setPosition(nextPos)
    }

    parabola(x, a, b, c) {
        return a * Math.pow(x, 2) + b * x + c;
    }
}