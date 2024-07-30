/*
    Probability Density Functions for randomising parallax doodles
    Yes, this is very overkill

    The implementation is something similar to Minecraft's mob spawning potential:
    https://www.youtube.com/watch?v=4XNvnKDSoEw&t=304s
*/

import Vector2 from "../types/Vector2";

export default class PDFGrid {
    public grid: number[][];
    constructor(
        public width: number,
        public height: number,
        public repulsionProbabilityFunction: (distance: number) => number
    ) {
        width = Math.ceil(width);
        height = Math.ceil(height);
        this.grid = new Array(height).fill(0).map(() => new Array(width).fill(0));
    }

    public get(position: Vector2): number {
        return this.grid[position.y][position.x];
    }
    public set(position: Vector2, value: number) {
        this.grid[position.y][position.x] = value;
    }
    public place(position: Vector2): void {
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                const distance = Vector2.distanceTo(new Vector2(i, j), position);
                const repulsion = this.repulsionProbabilityFunction(distance);
                this.grid[j][i] += repulsion;
            }
        }
    }
    public placeRandom(): [Vector2, number] {
        let position: Vector2;
        let attempts = 0;
        do {
            position = new Vector2(
                Math.floor(Math.random() * this.width),
                Math.floor(Math.random() * this.height),
            );
            attempts++;
        } while (Math.random() <= this.get(position));
        this.place(position);
        return [position, attempts];
    }
}