import {move, moveSync} from "https://deno.land/std@0.122.0/fs/mod.ts";
//await moveFile("./t.txt","./public/t.txt");
export async function moveFile(source: string, destination: string): Promise<void> {

    try {

      //  move(source, destination);
       moveSync(source, destination);


    } catch (error) {

    }


}
