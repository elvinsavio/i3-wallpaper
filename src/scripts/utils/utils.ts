
interface Point {
    x: number;
    y: number;
}


function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}



function getRandomPointWithinRadius(center: Point, radius: number): Point {
    const angle = Math.random() * Math.PI * 2; 
    const distance = Math.sqrt(Math.random()) * radius;

    const x = center.x + distance * Math.cos(angle);
    const y = center.y + distance * Math.sin(angle);

    return { x, y };
}


export { getRandomArbitrary, getRandomPointWithinRadius }