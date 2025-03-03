class User{
    constructor(user_id, first_name, last_name, username, email, password, account_role, user_credit){
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.account_role = account_role;
        this.user_credit = user_credit;
    }
}
module.exports = User;