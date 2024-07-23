const Binder = require('../utils/binder')
const axios = require('axios');

class TwoFactor {
  constructor({
    API,
    NAMESPACE,
    SECRET
  }) {
    this.axios = axios.create({
      baseURL: API + '/' + NAMESPACE + '/' + SECRET,
    })

    Binder.bind(this, TwoFactor)
  }

  sendOtpMobile(mobile, msgTemplate) {
    return this.axios.get(`/SMS/${mobile}/AUTOGEN/${msgTemplate}`)
  }

  verifyOtp(otp_id, otp) {
    return this.axios.get(`/SMS/VERIFY/${otp_id}/${otp}`)
  }
}

module.exports = new TwoFactor({
  API: process.env.TWO_FACTOR_ENDPOINT,
  NAMESPACE: process.env.TWO_FACTOR_NAMESPACE,
  SECRET: process.env.TWO_FACTOR_SECRET
});
