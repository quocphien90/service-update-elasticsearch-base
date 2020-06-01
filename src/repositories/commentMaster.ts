import { getRepository, Repository, Connection, getConnection } from "typeorm";
import { comment_master } from "./entity/comment_master";

const findByAddressAndOutletCode = (outletCode: string, addressCode: string): Promise<comment_master> => {
    return getConnection()
        .getRepository(comment_master)
        .findOne({
            where: {
                outlet_code: outletCode,
                address_code: addressCode
            }
        });
}

export default {
    findByAddressAndOutletCode
};
