import { getRepository, Repository, Connection, getConnection, getManager, IsNull, Not } from "typeorm";
import { Mappings } from "./entity/mappings";
import moment from 'moment';

const findAllMappings = (clientId: number): Promise<Mappings[]> => {
    return getConnection()
        .getRepository(Mappings)
        .find({
            where: {
                client_id: clientId,
                outlet_code: Not(IsNull())
            }
        });
}



const findAllMappingsForJapan = () => {
    console.log('-------------------Query database to get information to create full index in ElasticSearch-------------------');
    let queryString =
        `SELECT mappings.id, 
        mappings.zip, 
        mappings.client_id, 
        mappings.level1 as prefectureName, 
        mappings.level2 as cityName, 
        mappings.level3 as villeageName, 
        mappings.level4 as st, 
        mappings.level5, mappings.level6, mappings.level7, 
        mappings.from_date, 
        mappings.to_date,
        mappings.address_code,
        mappings.level7 AS japanese_name,
        mappings.level7 AS english_name,
        mappings.created_at,
        mappings.updated_at,
        mappings.active,
        mappings.language
    FROM mappings_20191118 as mappings Where client_id = 1`;
    return getConnection().query(queryString);
    
};

const findMappingsByOutletCodesForJapan = (outletCodeArray: string[]) => {
    console.log('-------------------Query database to get information to create index in ElasticSearch-------------------');
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    let [queryString, parameters] = getConnection().driver.escapeQueryWithParameters( 
    `SELECT mappings.id, 
        mappings.zip, 
        mappings.client_id, 
        mappings.level1 as prefectureName, 
        mappings.level2 as cityName, 
        mappings.level3 as villeageName, 
        mappings.level4 as st, 
        mappings.level5, mappings.level6, mappings.level7, 
        address_outlet_mappings.from_date, 
        address_outlet_mappings.to_date,
        address_outlet_mappings.outlet_id as outlet_id,
        address_outlet_mappings.code as outlet_code,
        address_outlet_mappings.address_code,
        address_outlet_mappings.zip_code,
        address_outlet_mappings.japanese_name,
        address_outlet_mappings.english_name,
        mappings.created_at,
        mappings.updated_at,
        mappings.active,
        mappings.language
    FROM (
        SELECT address_outlet_mappings.address_code, address_outlet_mappings.zip_code, 
        outlets.zip, outlets.code, outlets.active, address_outlet_mappings.start_date as from_date, address_outlet_mappings.end_date as to_date, outlets.id as outlet_id,
        comment_master.ja as japanese_name, comment_master.en as english_name
        FROM address_outlet_mappings 
        INNER JOIN outlets ON outlet_code = outlets.code
        LEFT JOIN comment_master ON address_outlet_mappings.address_code = comment_master.address_code AND address_outlet_mappings.outlet_code = comment_master.outlet_code
        WHERE outlets.active = 1 
        AND ((outlets.from_date <= :today AND outlets.to_date >= :today) OR (outlets.from_date > :today))
        AND  outlets.code IN :outletCode 
    ) as address_outlet_mappings 
    INNER JOIN mappings_20191118 as mappings ON address_outlet_mappings.address_code = mappings.address_code
    Where client_id = 1`, {today: moment(currentDate).toDate(), outletCode: outletCodeArray}, {});
    return getConnection().manager.query(queryString, parameters);
    
};


const findMappingsInAddressAndOutletForJapan = (addressCodeArray: string[], outletCodeArray: string[], hasOutlet: boolean = false) => {
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    console.log('-------------------Query database to get mappings not in CSV file -------------------');
    let queryString = `SELECT mappings.id, 
        mappings.zip, 
        mappings.client_id, 
        mappings.level1 as prefectureName, 
        mappings.level2 as cityName, 
        mappings.level3 as villeageName, 
        mappings.level4 as st, 
        mappings.level5, mappings.level6, mappings.level7, 
        address_outlet_mappings.from_date, 
        address_outlet_mappings.to_date,`;
    if(hasOutlet) {
        queryString += 
        `address_outlet_mappings.outlet_id as outlet_id,
        address_outlet_mappings.code as outlet_code,`;
    }
        queryString += 
        `address_outlet_mappings.address_code,
        address_outlet_mappings.japanese_name,
        address_outlet_mappings.english_name,
        mappings.created_at,
        mappings.updated_at,
        mappings.active,
        mappings.language
    FROM (
        SELECT address_outlet_mappings.address_code, address_outlet_mappings.zip_code, 
        outlets.zip, outlets.code, outlets.active, address_outlet_mappings.start_date as from_date, address_outlet_mappings.end_date as to_date, outlets.id as outlet_id,
        comment_master.ja as japanese_name, comment_master.en as english_name
        FROM address_outlet_mappings 
        INNER JOIN outlets ON outlet_code = outlets.code
        LEFT JOIN comment_master ON address_outlet_mappings.address_code = comment_master.address_code AND address_outlet_mappings.outlet_code = comment_master.outlet_code
        WHERE outlets.active = 1 
        AND ((outlets.from_date <= :today AND outlets.to_date >= :today) OR (outlets.from_date > :today)) 
        AND  outlets.code IN (?) 
        AND  address_outlet_mappings.address_code IN (?) 
    ) as address_outlet_mappings 
    INNER JOIN mappings_20191118 as mappings ON address_outlet_mappings.address_code = mappings.address_code
    Where client_id = 1`;
    return getConnection().query(queryString,
       [
        currentDate,
        currentDate,
        outletCodeArray.join(","),
        addressCodeArray.join(","),
       ],
    );
    
};
export default {
    findAllMappings,
    findMappingsInAddressAndOutletForJapan,
    findMappingsByOutletCodesForJapan,
    findAllMappingsForJapan
};
