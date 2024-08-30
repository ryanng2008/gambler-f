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

export function getUTCDateTime() {
    const now = new Date();

    // Get the UTC date and time components
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    // Construct the string in the desired format
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;
    return formattedDateTime
}