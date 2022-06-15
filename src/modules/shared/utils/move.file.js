import { promises } from 'fs';
export async function moveFile(source, destination) {
    try {
        // 2. Rename the file (move it to the new directory)
        await promises.rename(source, destination);
    }
    catch (error) {
        if (error.code === 'EXDEV') {
            // 3. Copy the file as a fallback
            await promises.copyFile(source, destination);
            // Remove the old file
            await promises.unlink(source);
        }
        else {
            // Throw any other error
            throw error;
        }
    }
    // return promises.rename(source, destination)
    //   .then(() => {/* Handle success */
    //   })
    //   .catch((error) => {/* Handle failure */
    //     console.log(error);
    //   });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW92ZS5maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFOUIsTUFBTSxDQUFDLEtBQUssVUFBVSxRQUFRLENBQUMsTUFBYyxFQUFFLFdBQW1CO0lBRWhFLElBQUk7UUFDRixvREFBb0Q7UUFDcEQsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUM1QztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMxQixpQ0FBaUM7WUFDakMsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM3QyxzQkFBc0I7WUFDdEIsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCx3QkFBd0I7WUFDeEIsTUFBTSxLQUFLLENBQUM7U0FDYjtLQUNGO0lBRUQsOENBQThDO0lBQzlDLHNDQUFzQztJQUN0QyxPQUFPO0lBQ1AsNENBQTRDO0lBQzVDLDBCQUEwQjtJQUMxQixRQUFRO0FBR1YsQ0FBQyJ9