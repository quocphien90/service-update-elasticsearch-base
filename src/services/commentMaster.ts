import commentMasterRepo from '../repositories/commentMaster'

const getCommentByAddressOutlet = async (addressCode: string, outletCode: string) => {
    let japaneseAddressName = '';
    const customAddressEntity = await commentMasterRepo.findByAddressAndOutletCode(outletCode, addressCode);
    if (customAddressEntity != null) {
        japaneseAddressName = customAddressEntity.ja;
    }
    return japaneseAddressName;
}


export default {
    getCommentByAddressOutlet
}