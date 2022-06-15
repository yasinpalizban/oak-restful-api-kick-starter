//awaitdeleteFile("./t.txt");
export async function deleteFile(source: string): Promise<void> {

    try {

        await Deno.remove(source);
    } catch (error) {


    }

    // return promises.rename(source, destination)
    //   .then(() => {/* Handle success */
    //   })
    //   .catch((error) => {/* Handle failure */
    //     console.log(error);
    //   });


}
