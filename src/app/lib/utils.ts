export function reduceRatio(firstNum: number, secondNum: number) {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(firstNum, secondNum);
    const [reducedFirst, reducedSecond] = [firstNum/divisor, secondNum/divisor];
    return `${reducedFirst}:${reducedSecond}`
}

export const galleryImages = ['asap.jpeg', 'travis.jpeg']

export function getRandomImage() {
    return '/gallery/' + galleryImages[Math.floor(Math.random()*galleryImages.length)]
}