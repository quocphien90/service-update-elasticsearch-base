import { getRepository, Repository, Not, IsNull, getConnection, Brackets } from "typeorm";
import { AddressOutletMappings } from "./entity/address_outlet_mappings";

const findAllAddressOutletMappings = (): Promise<AddressOutletMappings[]> => {
    const currentDate = new Date();
    return getConnection()
        .getRepository(AddressOutletMappings).createQueryBuilder('address_outlet_mappings')
        .where('address_outlet_mappings.address_code IS NOT NULL')
        .andWhere(new Brackets(qb => {
            qb.where("address_outlet_mappings.start_date <= :today", { today: new Date() })
            .andWhere("address_outlet_mappings.end_date >= :today", { today: new Date() })
        }))
        .groupBy('address_outlet_mappings.address_code')
        .getMany();
}

export default {
    findAllAddressOutletMappings
};
