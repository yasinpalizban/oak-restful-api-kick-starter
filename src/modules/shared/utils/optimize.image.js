import Jimp from 'jimp';
/**
 * Resize + optimize images.
 *
 * @param path
 * @param width
 * @param height
 * @param quality
 */
export async function optimizeImage(path, width, height, quality) {
    const image = await Jimp.read(path);
    await image.resize(width, height); // resize
    await image.quality(quality); // set JPEG quality
    // await image.greyscale(); // set greyscale
    await image.write(path); //
    // await Promise.all(
    //   images.map(async imgPath => {
    //     const image = await Jimp.read(imgPath);
    //     await image.resize(width, height);
    //     await image.quality(quality);
    //     await image.writeAsync(imgPath);
    //   })
    // );
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemUuaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcHRpbWl6ZS5pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFFeEI7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFHLE9BQWU7SUFHL0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQzVDLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtJQUNqRCw0Q0FBNEM7SUFDNUMsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUUzQixxQkFBcUI7SUFDckIsa0NBQWtDO0lBQ2xDLDhDQUE4QztJQUM5Qyx5Q0FBeUM7SUFDekMsb0NBQW9DO0lBQ3BDLHVDQUF1QztJQUN2QyxPQUFPO0lBQ1AsS0FBSztBQUNQLENBQUMifQ==