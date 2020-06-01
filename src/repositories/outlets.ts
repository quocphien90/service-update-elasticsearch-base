import { getRepository, Repository, Connection, getConnection, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Outlets } from "./entity/outlets";

const findOutletActiveByCode = async (outletCode: string) => {
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    return getConnection().getRepository(Outlets).findOne({
        where: {
            code: outletCode,
            from_date: LessThanOrEqual(tomorrow),
            to_date: MoreThanOrEqual(tomorrow),
            is_active: 1
        },
    });
};


const findAllOutletsActive = async () => {
    const currentDate = new Date();
    return getConnection().getRepository(Outlets).find({
        select: ["code"],
        where: {
            from_date: LessThanOrEqual(currentDate),
            to_date: MoreThanOrEqual(currentDate),
            is_active: 1
        },
    });
};

export default { findOutletActiveByCode, findAllOutletsActive }