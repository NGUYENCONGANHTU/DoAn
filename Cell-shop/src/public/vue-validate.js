import { defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

defineRule('required', value => {
if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});

defineRule('email', value => {
    if (!value || !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
        return 'Email must be valid and include a domain like .com';
      }
    return true ;
});


defineRule('phone', value => {
    const phone = value.trim().split(' ');
    if(phone.length === 11 || phone.length < 8 ){
        return 'This phone field must enter 10 numbers'
    }
    return true;
});

defineRule('image', value => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const ext = value.split('.').pop().toLowerCase();
    if(!allowedExtensions.includes(ext)){
        return 'image must be jpg jpeg png gif'
    }
    return true;
});