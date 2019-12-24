import { PublicAddress } from '../../entities/PublicAddress'
import { SignedTransaction } from './SignedTransaction'
import { Constants } from '../../utils/constants'
import { validationRules } from '../../utils/validation'

export class AddPublicAddress extends SignedTransaction {
  public ENDPOINT: string = 'chain/add_pub_address'
  public ACTION: string = 'addaddress'
  public ACCOUNT: string = Constants.defaultAccount
  public fioAddress: string
  public publicAddresses: PublicAddress[]
  public maxFee: number
  public walletFioAddress: string

  constructor(fioAddress: string, publicAddresses: PublicAddress[], maxFee: number, walletFioAddress: string = '') {
    super()
    this.fioAddress = fioAddress
    this.publicAddresses = publicAddresses
    this.maxFee = maxFee
    this.walletFioAddress = walletFioAddress

    this.validationData = { fioAddress, tpid: walletFioAddress }
    this.validationRules = validationRules.addPublicAddressRules
  }

  public getData(): any {
    const actor = this.getActor()
    const data = {
      fio_address: this.fioAddress,
      public_addresses: this.publicAddresses,
      actor,
      tpid: this.walletFioAddress,
      max_fee: this.maxFee,
    }
    return data
  }
}
