import { outletsRepo } from '../repositories';

const checkIsOutletActive = async (outletCode: string) => {
    const outletEntity = await outletsRepo.findOutletActiveByCode(outletCode);
    if (outletEntity != null) {
        return true;
    }
    return false;
};

const getAllOutletActive = () => {
    return outletsRepo.findAllOutletsActive();
}

export default {
    checkIsOutletActive,
    getAllOutletActive
}