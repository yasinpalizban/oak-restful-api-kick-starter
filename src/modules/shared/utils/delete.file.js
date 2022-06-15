import { promises } from 'fs';
export async function deleteFile(source) {
    try {
        //  await promises.access(source, fs.constants.F_OK);
        await promises.unlink(source);
    }
    catch (error) {
        //  throw error;
    }
    // return promises.rename(source, destination)
    //   .then(() => {/* Handle success */
    //   })
    //   .catch((error) => {/* Handle failure */
    //     console.log(error);
    //   });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWxldGUuZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBSTlCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsVUFBVSxDQUFDLE1BQWM7SUFFN0MsSUFBSTtRQUNKLHFEQUFxRDtRQUNuRCxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNoQixnQkFBZ0I7S0FFZjtJQUVELDhDQUE4QztJQUM5QyxzQ0FBc0M7SUFDdEMsT0FBTztJQUNQLDRDQUE0QztJQUM1QywwQkFBMEI7SUFDMUIsUUFBUTtBQUdWLENBQUMifQ==