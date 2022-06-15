const callSeeder = (async () => {
    //   -seed=../../modules/home/seeders/file.seeder.ts


    let path = Deno.args[1];

    if (!path) {
        console.log('seed path is empty');
        console.log('follow this structure to work correctly');
        console.log('npm run seeder --seed=../../common/seeds/file.seeder.ts');
        Deno.exit();
    }

    // const dropDotTs = path.search('.ts');
    // if (dropDotTs !== -1) {
    //     path = path.substr(0, dropDotTs).trim();
    // }

    const file = await import(path);
    const myClass = new file.default();
    console.log('Start seeding : ' +Deno.args[1] + '  \n');
    await myClass.run();
})()
    .then(() => {
        console.log('Finish seeding ');
        Deno.exit();
    })
    .catch(error => {
        console.log('Ops seeding error : \n ');
        console.error(error);
    });
