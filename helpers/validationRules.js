import validator from "validator"

export default {
  requiredField: value => !!value || "Trường bắt buộc.",
  minField: min => value => value.length >= min || `Cần ít nhất ${min} kí tự.`,
  isEmail: value => validator.isEmail(value) || "Email không đúng dạng.",
  isPhoneNumber: value =>
    (value ? validator.isMobilePhone(value, "vi-VN") : true) ||
    "Không đúng định dạng số điện thoại Việt Nam.",
}
