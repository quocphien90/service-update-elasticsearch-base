import mappingsRepo from '../repositories/mappings'

const findAllMappings = (clientId: number) => {
    return mappingsRepo.findAllMappings(clientId);
}

const findMappingsByOutletCodesForJapan = (outletCodeArray: string[]) => {
    return mappingsRepo.findMappingsByOutletCodesForJapan(outletCodeArray);
}

const findMappingsInAddressAndOutletForJapan = (addressCodeArray: string[], outletCodeArray: string[], hasOutlet: boolean = false) => {
    return mappingsRepo.findMappingsInAddressAndOutletForJapan(addressCodeArray, outletCodeArray, hasOutlet);
}

const findAllMappingsForJapan = () => {
    return mappingsRepo.findAllMappingsForJapan();
}

export default {
    findAllMappings,
    findMappingsByOutletCodesForJapan,
    findMappingsInAddressAndOutletForJapan,
    findAllMappingsForJapan
}