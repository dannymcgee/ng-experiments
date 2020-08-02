/**
 * ### Convert pixel values to rem.
 *
 * Users who've changed their browser's font-size setting will see this value scaled according to their preference.
 *
 * **Advantages:**
 * - Users with visual impairments won't have to squint.
 * - You won't have to do math in your head every time you set the size of something.
 * - Used consistently, all dimensions in the app will scale linearly with the root font size, making for happy designers.
 *
 * It's a win-win-win!
 */
export function rem (value: number): string {
	return `${value / 16}rem`;
}
