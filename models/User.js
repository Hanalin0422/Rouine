const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// schema // 1
var userSchema = mongoose.Schema({
  username:{
    type:String,
    required:[true,'ID를 입력해주세요!'],
    match:[/^.{4,12}$/,'Should be 4-12 characters!'],
    trim:true,
    unique:true
  }, 
  password:{
    type:String,
    required:[true,'패스워드를 입력해주세요!'],
    select:false
  },
  name:{
    type:String,
    required:[true,'이름을 입력해주세요!'],
    trim:true
  },
  email:{
    type:String,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'유효한 이메일을 입력해주셔야 합니다!'],
    required:[true,'이메일을 입력해주세요!'],
    trim:true,
    unique:true
  },
  right:{
      type:Boolean,
      default:false
  }
},{
  toObject:{virtuals:true}
});
userSchema.index({ username: 1 ,email: 1});
// virtuals // 2
userSchema.virtual('passwordConfirmation')
  .get(function(){ return this._passwordConfirmation; })
  .set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
  .get(function(){ return this._originalPassword; })
  .set(function(value){ this._originalPassword=value; });

userSchema.virtual('currentPassword')
  .get(function(){ return this._currentPassword; })
  .set(function(value){ this._currentPassword=value; });

userSchema.virtual('newPassword')
  .get(function(){ return this._newPassword; })
  .set(function(value){ this._newPassword=value; });

  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  var passwordRegexErrorMessage = '최소 8자리의 문자와 숫자를 사용해주셔야 합니다!';
  userSchema.path('password').validate(function(v) {
    var user = this;

    // create user
    if(user.isNew){
      if(!user.passwordConfirmation){
        user.invalidate('passwordConfirmation', '비밀번호를 맞게 적었는지 확인해주세요!');
      }

      if(!passwordRegex.test(user.password)){
        user.invalidate('password', passwordRegexErrorMessage);
      }
      else if(user.password !== user.passwordConfirmation) {
        user.invalidate('passwordConfirmation', '비밀번호가 일치하지 않습니다!');
      }
    }

    // update user
    if(!user.isNew){
      if(!user.currentPassword){
        user.invalidate('currentPassword', 'Current Password is required!');
      }
      else if(!bcrypt.compareSync(user.currentPassword, user.originalPassword)){
        user.invalidate('currentPassword', 'Current Password is invalid!');
      }

      if(user.newPassword && !passwordRegex.test(user.newPassword)){
        user.invalidate("newPassword", passwordRegexErrorMessage);
      }
      else if(user.newPassword !== user.passwordConfirmation) {
        user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
      }
    }
  });
// hash password // 3
userSchema.pre('save', function (next){
  var user = this;
  if(!user.isModified('password')){ // 3-1
    return next();
  }
  else {
    user.password = bcrypt.hashSync(user.password); //3-2
    return next();
  }
});

// model methods // 4
userSchema.methods.authenticate = function (password) {
  var user = this;
  return bcrypt.compareSync(password,user.password);
};
// model & export
const User = mongoose.model('user',userSchema);
module.exports = User;