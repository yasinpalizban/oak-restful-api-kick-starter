import DB from '../../../core/databases/database';
process.env['NODE_CONFIG_DIR'] = './src/core/configs';
/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *  */
export class Seeder {
    constructor() {
        DB.sequelize.sync({ force: false });
    }
    async run() {
        //
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VlZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWxELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztBQUd0RDs7O01BR007QUFDTixNQUFNLE9BQU8sTUFBTTtJQUNqQjtRQUNFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ1AsRUFBRTtJQUNKLENBQUM7Q0FDRiJ9