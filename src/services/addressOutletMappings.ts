import addressOutletMappingRepo from '../repositories/addressOutletMappings'

const findAllAddressOutletMappings = () => {
    return addressOutletMappingRepo.findAllAddressOutletMappings();
}


export default {
    findAllAddressOutletMappings
}