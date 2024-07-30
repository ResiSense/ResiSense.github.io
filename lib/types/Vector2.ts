export default class Vector2 {
    constructor(public x: number, public y: number) { }
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    divide(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }
    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get normalised(): Vector2 {
        return this.divide(this.magnitude);
    }
    distanceTo(other: Vector2): number {
        return this.subtract(other).magnitude;
    }

    static distanceTo(a: Vector2, b: Vector2): number {
        return a.distanceTo(b);
    }
}